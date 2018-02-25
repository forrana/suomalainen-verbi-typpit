export default class GuessedWords {
  constructor() {
    this.guessedWordsArray = []
    this.outputArea = document.getElementById("guessed-words")
  }

  set guessedWords(guessedWord) {
    this.guessedWordsArray.push(guessedWord)
    this.rerenderWords()
  }

  get guessedWords() {
    this.guessedWordsArray.sort()
  }

  rerenderWords() {
    this.outputArea.innerHTML = ""
    this.guessedWordsArray.map(
      (guessedWord) => this.outputArea.appendChild(this.createWordElement(guessedWord))
    )
  }

  createWordElement(text) {
    let span = document.createElement('span')
    span.innerHTML = text
    span.classList.add('guessed-word')
    return span
  }
}
