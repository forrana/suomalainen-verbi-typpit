import { verbs, TOTALWORDS } from "./constants.js"

export default class WordsManager {
  constructor(level) {
    this.loadGroupsScoring()
    this.mixWords(level)
  }

  loadGroupsScoring() {
    ["vt1", "vt2", "vt3", "vt4", "vt5", "vt6"].forEach(this.loadGroupScoring.bind(this))
  }

  loadGroupScoring(groupName) {
    let loadedVerbs = []
    let loadFunc
    switch(groupName) {
      case "vt1":
          loadedVerbs = JSON.parse(localStorage.getItem("vt1")) || []
          loadFunc = this.loadOrInitVerb(loadedVerbs)
          verbs.vt1 = verbs.vt1.map(loadFunc).sort((a,b) => a.score - b.score)
          localStorage.setItem("vt1", JSON.stringify(verbs.vt1))
          break
      case "vt2":
          loadedVerbs = JSON.parse(localStorage.getItem("vt2")) || []
          loadFunc = this.loadOrInitVerb(loadedVerbs)
          verbs.vt2 = verbs.vt2.map(loadFunc).sort((a,b) => a.score - b.score)
          localStorage.setItem("vt2", JSON.stringify(verbs.vt2))
          break
      case "vt3":
          loadedVerbs = JSON.parse(localStorage.getItem("vt3")) || []
          loadFunc = this.loadOrInitVerb(loadedVerbs)
          verbs.vt3 = verbs.vt3.map(loadFunc).sort((a,b) => a.score - b.score)
          localStorage.setItem("vt3", JSON.stringify(verbs.vt3))
          break
      case "vt4":
        loadedVerbs = JSON.parse(localStorage.getItem("vt4")) || []
        loadFunc = this.loadOrInitVerb(loadedVerbs)
        verbs.vt4 = verbs.vt4.map(loadFunc).sort((a,b) => a.score - b.score)
        localStorage.setItem("vt4", JSON.stringify(verbs.vt4))
        break
      case "vt5":
        loadedVerbs = JSON.parse(localStorage.getItem("vt5")) || []
        loadFunc = this.loadOrInitVerb(loadedVerbs)
        verbs.vt5 = verbs.vt5.map(loadFunc).sort((a,b) => a.score - b.score)
        localStorage.setItem("vt5", JSON.stringify(verbs.vt5))
        break
      case "vt6":
        loadedVerbs = JSON.parse(localStorage.getItem("vt6")) || []
        loadFunc = this.loadOrInitVerb(loadedVerbs)
        verbs.vt6 = verbs.vt6.map(loadFunc).sort((a,b) => a.score - b.score)
        localStorage.setItem("vt6", JSON.stringify(verbs.vt6))
        break
    }
  }

  loadOrInitVerb(verbs) {
    return (checkingVerb) => {
      if(typeof checkingVerb == "string") {
        let verb = verbs.find(verb => verb.name == checkingVerb)
        if(verb) {
          return verb
        } else return {name: `${checkingVerb}`, score: 0}
      } else {
        let verb = verbs.find(verb => verb.name == checkingVerb.name)
        if(verb) {
          return verb
        } else return {name: `${checkingVerb.name}`, score: 0}
      }
    }
  }

  mixWords(level) {
    let currentVerbCount = TOTALWORDS
    let randomVerbs = []
    for( let i = 0; i < TOTALWORDS*100; i++ ) {
      if(currentVerbCount === 0) break
      let group = getRandomInt(6)
      let verb = ""
      let appendParams = []
      switch (group) {
        case 0:
          verb = this.getCurrentLevelRandomVerbs(verbs.vt1, level)
          appendParams = [verb, 'vt1']
          break;
        case 1:
          verb = this.getCurrentLevelRandomVerbs(verbs.vt2, level)
          appendParams = [verb, 'vt2']
          break;
        case 2:
          verb = this.getCurrentLevelRandomVerbs(verbs.vt3, level)
          appendParams = [verb, 'vt3']
          break;
        case 3:
          verb = this.getCurrentLevelRandomVerbs(verbs.vt4, level)
          appendParams = [verb, 'vt4']
          break;
        case 4:
          verb = this.getCurrentLevelRandomVerbs(verbs.vt5, level)
          appendParams = [verb, 'vt5']
          break;
        case 5:
          verb = this.getCurrentLevelRandomVerbs(verbs.vt6, level)
          appendParams = [verb, 'vt6']
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
