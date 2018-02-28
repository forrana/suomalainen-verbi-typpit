import { gerunds, infinitives, indifferent, randomVerbs, names, TOTALWORDS } from "./constants.js"

export default class WordsManager {
  constructor(level) {
    this.mixWords(level)
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
          verb = this.getCurrentLevelRandomVerbs(gerunds, level)
          appendParams = [verb, 'gerund']
          break;
        case 1:
          verb = this.getCurrentLevelRandomVerbs(infinitives, level)
          appendParams = [verb, 'infinitive']
          break;
        case 2:
          verb = this.getCurrentLevelRandomVerbs(indifferent, level)
          appendParams = [verb, 'indifferent']
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
  span.innerHTML = text
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
