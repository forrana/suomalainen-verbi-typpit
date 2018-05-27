import { verbs, randomVerbs, names, TOTALWORDS } from "./constants.js"

export default class WordsManager {
  constructor(level) {
    this.loadGroupsScoring()
    this.mixWords(level)
  }

  loadGroupsScoring(){
    ["gerunds", "infinitives", "indifferents"].forEach(this.loadGroupScoring.bind(this))
  }

  loadGroupScoring(groupName){
    let loadedVerbs = []
    let loadFunc
    switch(groupName) {
      case "gerunds":
          loadedVerbs = JSON.parse(localStorage.getItem("gerunds")) || []
          loadFunc = this.loadOrInitVerb(loadedVerbs)
          verbs.gerunds = verbs.gerunds.map(loadFunc).sort((a,b) => a.score + b.score)
          localStorage.setItem("gerunds", JSON.stringify(verbs.gerunds))
          break
      case "infinitives":
          loadedVerbs = JSON.parse(localStorage.getItem("infinitives")) || []
          loadFunc = this.loadOrInitVerb(loadedVerbs)
          verbs.infinitives = verbs.infinitives.map(loadFunc).sort((a,b) => a.score + b.score)
          localStorage.setItem("infinitives", JSON.stringify(verbs.infinitives))
          break
      case "indifferents":
          loadedVerbs = JSON.parse(localStorage.getItem("indifferents")) || []
          loadFunc = this.loadOrInitVerb(loadedVerbs)
          verbs.indifferents = verbs.indifferents.map(loadFunc).sort((a,b) => a.score + b.score)
          localStorage.setItem("indifferents", JSON.stringify(verbs.indifferents))
          break
    }
  }

  loadOrInitVerb(verbs) {
    return (verbName) => {
      let verb = verbs.find(verb => verb.name == verbName)
      if(verb) {
        return verb
      } else return {name: `${verbName}`, score: 0}
    }
  }

  mixWords(level) {
    let currentVerbCount = TOTALWORDS
    let randomVerbs = []
    for( let i = 0; i < TOTALWORDS*100; i++ ) {
      if(currentVerbCount === 0) break
      let group = getRandomInt(3)
      let verb = ""
      let appendParams = []
      switch (group) {
        case 0:
          verb = this.getCurrentLevelRandomVerbs(verbs.gerunds, level)
          appendParams = [verb, 'gerunds']
          break;
        case 1:
          verb = this.getCurrentLevelRandomVerbs(verbs.infinitives, level)
          appendParams = [verb, 'infinitives']
          break;
        case 2:
          verb = this.getCurrentLevelRandomVerbs(verbs.indifferents, level)
          appendParams = [verb, 'indifferents']
          break;
      }
        if( !randomVerbs.find( (element) => element[0] == appendParams[0] ) ) {
          randomVerbs.push(appendParams)
          currentVerbCount--
        }
    }
    randomVerbs.map( (randomVerb) => appendToZone('ungrouped', createSpan(...randomVerb)))
  }

  getCurrentLevelRandomVerbs(verbs, level) {
    let levelDelta = Math.ceil(verbs.length / 3)
    let levelArrayMax = Math.ceil(levelDelta * level) > verbs.length ? verbs.length : Math.ceil(levelDelta * level)
    let levelArrayMin = levelArrayMax - levelDelta
    let levelArrayIndex = getRandomInt(levelDelta) + levelArrayMin
    return verbs[levelArrayIndex]
  }
}

function createSpan(text, type){
  let span = document.createElement('span')
  span.innerHTML = text.name
  span.draggable = true
  span.wordType = type
  span.classList.add('word')
  span.style.order = getRandomInt(10)
  span.ondragstart="event.dataTransfer.setData('text/plain',null)"
  return span
}


function appendToZone(zone, element){
  document.getElementById(zone).appendChild(element)
}

export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
