function main() {
  gerunds.map((gerund) => appendToZone('ungrouped', createSpan(gerund, 'gerund')))
  infinitives.map((infinitive) => appendToZone('ungrouped', createSpan(infinitive, 'infinitive')))
  indifferent.map((infinitive) => appendToZone('ungrouped', createSpan(infinitive, 'indifferent')))
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
  'suggested',
  'mind',
  'recommended',
  'denied',
  'consider'
]

let infinitives = [
  'agreed',
  'appear',
  'claims',
  'hesitate',
  'pretended',
  'refused',
  'happened'
]

let indifferent = [
  'try',
  'remember',
  'stop',
  'regret',
  'forget'
]


export default main
