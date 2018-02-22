import Health from "./health.js"

let gerunds = [
  'postpone',
  'resist',
  'delay',
  'suggest',
  'mind',
  'recommend',
  'deny',
  'consider'
]

let infinitives = [
  'care',
  'arrange',
  'agree',
  'appear',
  'claim',
  'hesitate',
  'pretend',
  'refuse',
  'happen'
]

let indifferent = [
  'try',
  'remember',
  'stop',
  'regret',
  'forget'
]

const TOTALLEVELS = 3
const TOTALWORDS = Math.round((gerunds.length + infinitives.length + indifferent.length) / TOTALLEVELS)
const INITLEVEL = 1

class LevelingSystem {
  constructor() {
    this.init()
  }

  init(){
    this.level = INITLEVEL
    this.guessedWords = 0
    this.printCurrentLevel()
  }

  printCurrentLevel() {
    let raundElement = document.getElementById('raund')
    raundElement.innerHTML = `Level: ${this.level}`
    raundElement.style.color = '#'+(0x1000000+(Math.random())*0xffffff).toString(16).substr(1,6)
  }

  get level() {
    return this.currentLevel
  }

  set level(level) {
    this.currentLevel = level
  }

  addProgress() {
    this.guessedWords++
    console.log(this.guessedWords)
    console.log(this.level)
    if(this.guessedWords == TOTALWORDS) {
      this.guessedWords = 0
      this.level++
      if(this.level > TOTALLEVELS) {
        this.level = INITLEVEL
      }
      this.printCurrentLevel()
      return true
    }
    return false
  }
}

class Main {
  constructor() {
    this.currentHealth = new Health(3)
    this.init(INITLEVEL)
    this.levelingSystem = new LevelingSystem()
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

let randomVerbs = [
  'having',
  'doing',
  'saying',
  'going',
  'getting',
  'thinking',
  'taking',
  'seeing',
  'coming',
  'using',
  'finding',
  'giving',
  'working',
  'calling',
  'trying',
  'asking',
  'needing',
  'feeling',
  'becoming',
  'leaving'
]

let names = [
  'Amelia',
  'Olivia',
  'Isla',
  'Emily',
  'Poppy',
  'Ava',
  'Isabella',
  'Jessica',
  'Lily',
  'Jack',
  'Harry',
  'Jacob',
  'Charlie',
  'Thomas',
  'George',
  'Oscar',
  'James',
  'William'
]

export default Main
