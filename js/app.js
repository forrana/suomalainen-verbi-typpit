import Health from "./health.js"
import GuessedWords from "./guessed.js"
import { verbs, TOTALWORDS } from "./constants.js"
import LevelingSystem, { INITLEVEL, TOTALLEVELS } from "./leveling-system.js"
import WordsManager, { getRandomInt } from "./wordsmanager.js"

export default class Main {
  constructor() {
    this.currentHealth = new Health(3)
    this.init(INITLEVEL)
    this.levelingSystem = new LevelingSystem(TOTALWORDS)
    this.guessedWordsArea = new GuessedWords(verbs.vt1, verbs.vt2, verbs.vt3, verbs.vt4, verbs.vt5, verbs.vt6)
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
    this.guessedWordsArea.guessedWords = dragged.innerHTML
    dragged.innerHTML = `${dragged.innerHTML}`
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
