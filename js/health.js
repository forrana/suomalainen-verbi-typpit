class Health {
  constructor(maxHealth) {
    this.currentHealth = maxHealth
    this.maxHealth = maxHealth
  }

  resetHealth() {
    this.health = this.maxHealth
  }

  decreaseHealth() {
    if(this.health > 0) {
      this.health--
      return true
    }
    this.resetHealth()
    return false
  }

  get health() {
    return this.currentHealth
  }

  set health(value) {
    this.currentHealth = value
  }
}

export default Health
