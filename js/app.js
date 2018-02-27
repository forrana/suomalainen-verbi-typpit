import Health from "./health.js"
import GuessedWords from "./guessed.js"
import { gerunds, infinitives, indifferent, randomVerbs, names } from "./constants.js"
import LevelingSystem, { INITLEVEL, TOTALLEVELS } from "./leveling-system.js"

const TOTALWORDS = Math.round((gerunds.length + infinitives.length + indifferent.length) / TOTALLEVELS)

export default class Main {
  constructor() {
    this.currentHealth = new Health(3)
    this.init(INITLEVEL)
    this.levelingSystem = new LevelingSystem(TOTALWORDS)
    this.guessedWordsArea = new GuessedWords(gerunds, infinitives, indifferent)
  }

  init(level){
    initializeNodes()
    mixWords(level)
  }

  onDropEvent(event, dragged) {
    if ( event.target.getAttribute('word-type') != dragged.wordType ) {
      if(this.currentHealth.decreaseHealth()) return
      this.init(INITLEVEL)
      this.levelingSystem.init()
      return false
    }
    let verb = nlp(randomVerbs[getRandomInt(randomVerbs.length - 1)]).verbs()
    let name = names[getRandomInt(names.length - 1)]
    this.guessedWordsArea.guessedWords = dragged.innerHTML
    dragged.innerHTML = nlp(`${dragged.innerHTML}`).verbs().toPresentTense().out() || `${dragged.innerHTML}s`
    switch(dragged.wordType){
      case "infinitive": verb = verb.toInfinitive(); dragged.innerHTML += ' to'
    }
    dragged.innerHTML = `${name} ${dragged.innerHTML} ${verb.out('text')}`
    if(this.levelingSystem.addProgress()) {
      this.init(this.levelingSystem.level)
    }

    return true
  }
}

function getCurrentLevelRandomVerbs(verbs, level) {
  let levelDelta = Math.ceil(verbs.length / 3)
  let levelArrayMax = Math.ceil(levelDelta * level) > verbs.length ? verbs.length : Math.ceil(levelDelta * level)
  let levelArrayMin = levelArrayMax - levelDelta
  let levelArrayIndex = getRandomInt(levelDelta) + levelArrayMin
  return verbs[levelArrayIndex]
}

function  mixWords(level) {
  let currentVerbCount = TOTALWORDS
  let randomVerbs = []
  for( let i = 0; i < TOTALWORDS*100; i++ ) {
    console.log('i', i)
    if(currentVerbCount === 0) break
    let group = getRandomInt(3)
    let verb = ""
    let appendParams = []
    switch (group) {
      case 0:
        verb = getCurrentLevelRandomVerbs(gerunds, level)
        appendParams = [verb, 'gerund']
        break;
      case 1:
        verb = getCurrentLevelRandomVerbs(infinitives, level)
        appendParams = [verb, 'infinitive']
        break;
      case 2:
        verb = getCurrentLevelRandomVerbs(indifferent, level)
        appendParams = [verb, 'indifferent']
        break;
    }
      if( !randomVerbs.find( (element) => element[0] == appendParams[0] ) ) {
        randomVerbs.push(appendParams)
        currentVerbCount--
      }
  }
  console.log(randomVerbs)
  randomVerbs.map( (randomVerb) => appendToZone('ungrouped', createSpan(...randomVerb)))
}

function initializeNodes() {
  document.getElementById("ungrouped").innerHTML = ""
  let children = [ ...document.getElementById("grouped").childNodes ]
  children.map((child) => child.innerHTML = "")
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

let createSpan = (text, type) => {
  let span = document.createElement('span')
  span.innerHTML = text
  span.draggable = true
  span.wordType = type
  span.classList.add('word')
  span.style.order = getRandomInt(10)
  span.ondragstart="event.dataTransfer.setData('text/plain',null)"
  return span
}

let appendToZone = (zone, element) => {
  document.getElementById(zone).appendChild(element)
}
