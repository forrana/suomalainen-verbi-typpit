import Health from "./health.js"
import GuessedWords from "./guessed.js"
import { gerunds, infinitives, indifferent, randomVerbs, names, TOTALWORDS } from "./constants.js"
import LevelingSystem, { INITLEVEL, TOTALLEVELS } from "./leveling-system.js"
import WordsManager, { getRandomInt } from "./wordsmanager.js"

export default class Main {
  constructor() {
    this.currentHealth = new Health(3)
    this.init(INITLEVEL)
    this.levelingSystem = new LevelingSystem(TOTALWORDS)
    this.guessedWordsArea = new GuessedWords(gerunds, infinitives, indifferent)
  }

  init(level){
    initializeNodes()
    this.wordsManager = new WordsManager(level)
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

function initializeNodes() {
  document.getElementById("ungrouped").innerHTML = ""
  let children = [ ...document.getElementById("grouped").childNodes ]
  children.map((child) => child.innerHTML = "")
}
