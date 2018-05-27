import Health from "./health.js"
import GuessedWords from "./guessed.js"
import { verbs, randomVerbs, names, TOTALWORDS } from "./constants.js"
import LevelingSystem, { INITLEVEL, TOTALLEVELS } from "./leveling-system.js"
import WordsManager, { getRandomInt } from "./wordsmanager.js"

export default class Main {
  constructor() {
    this.currentHealth = new Health(3)
    this.init(INITLEVEL)
    this.levelingSystem = new LevelingSystem(TOTALWORDS)
    this.guessedWordsArea = new GuessedWords(verbs.gerunds, verbs.infinitives, verbs.indifferents)
  }

  init(level){
    initializeNodes()
    this.wordsManager = new WordsManager(level)
  }

  onDropEvent(event, dragged) {
    let currentTypeVerbs = JSON.parse(localStorage.getItem(dragged.wordType))
    let currentVerb = currentTypeVerbs.find(verb => verb.name = dragged.textContent)
    if ( event.target.getAttribute('word-type') != dragged.wordType ) {
      currentVerb.score--
      localStorage.setItem(dragged.wordType, JSON.stringify(currentTypeVerbs))
      if(this.currentHealth.decreaseHealth()) return
      this.init(INITLEVEL)
      this.levelingSystem.init()
      return false
    }
    currentVerb.score++
    localStorage.setItem(dragged.wordType, JSON.stringify(currentTypeVerbs))
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
