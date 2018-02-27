export default class GuessedWords {
  constructor(...dictionaries) {
    this.outputArea = document.getElementById("guessed-words")
    this.guessedWordsArray = dictionaries.reduce( (acc,arr) => [...acc, ...arr], [])
    this.guessedWordsArray = this.guessedWordsArray.sort()
    this.rerenderWords()
  }

  set guessedWords(guessedWord) {
    let guessedWordElement = this.guessedWordsArray.find(
      guessedWordElement => guessedWordElement.innerHTML == guessedWord
    )
    guessedWordElement.style.opacity = 0.1 + +guessedWordElement.style.opacity
  }

  get guessedWords() {
    this.guessedWordsArray.sort()
  }

  rerenderWords() {
    this.outputArea.innerHTML = ""
    this.guessedWordsArray =
      this.guessedWordsArray.map(
        (guessedWord) => this.outputArea.appendChild(this.createWordElement(guessedWord))
      )
  }

  createWordElement(text) {
    let span = document.createElement('span')
    span.innerHTML = text
    span.style.opacity = 0.1
    span.classList.add('guessed-word')
    return span
  }
}
