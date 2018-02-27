export const INITLEVEL = 1
export const TOTALLEVELS = 3

export default class LevelingSystem {
  constructor(totalwords) {
    this.totalwords = totalwords
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
    if(this.guessedWords == this.totalwords) {
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
