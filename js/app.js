function main() {
  gerunds.map((gerund) => appendToZone('ungrouped', createSpan(gerund, 'gerund')))
  infinitives.map((infinitive) => appendToZone('ungrouped', createSpan(infinitive, 'infinitive')))
}

let createSpan = (text, type) => {
  let span = document.createElement('span')
  span.innerHTML = text
  span.draggable = true
  span.wordType = type
  span.classList.add('word')
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



export default main
