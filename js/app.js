import Health from "./health.js"
const TOTALWORDS = 10

class Main {

  constructor() {
    this.currentHealth = new Health(3)
    this.init()
  }

  init(){
    initializeNodes()
    // gerunds.map((gerund) => appendToZone('ungrouped', createSpan(gerund, 'gerund')))
    // infinitives.map((infinitive) => appendToZone('ungrouped', createSpan(infinitive, 'infinitive')))
    // indifferent.map((indifferent) => appendToZone('ungrouped', createSpan(indifferent, 'indifferent')))
    mixWords()
  }

  onDropEvent(event, dragged) {
    if ( event.target.getAttribute('word-type') != dragged.wordType ) {
      if(this.currentHealth.decreaseHealth()) return
      this.init()
      return false
    }
    let verb = nlp(randomVerbs[getRandomInt(randomVerbs.length - 1)]).verbs()
    let name = names[getRandomInt(names.length - 1)]
    dragged.innerHTML = nlp(`${dragged.innerHTML}`).verbs().toPresentTense().out() || `${dragged.innerHTML}s`
    switch(dragged.wordType){
      case "infinitive": verb = verb.toInfinitive(); dragged.innerHTML += ' to'
    }
    dragged.innerHTML = `${name} ${dragged.innerHTML} ${verb.out('text')}`
    return true
  }
}

function  mixWords() {
  let currentVerbCount = TOTALWORDS
  while(currentVerbCount > 0) {
    let group = getRandomInt(3)
    let verb = ""
    switch (group) {
      case 0:
        verb = gerunds[getRandomInt(gerunds.length-1)]
        appendToZone('ungrouped', createSpan(verb, 'gerund'))
        break;
      case 1:
        verb = infinitives[getRandomInt(infinitives.length-1)]
        appendToZone('ungrouped', createSpan(verb, 'infinitive'))
        break;
      case 2:
        verb = indifferent[getRandomInt(indifferent.length-1)]
        appendToZone('ungrouped', createSpan(verb, 'indifferent'))
        break;
    }
    currentVerbCount--
  }
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
