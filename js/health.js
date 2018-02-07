class Health {
  constructor(maxHealth) {
    this.currentHealth = maxHealth
    this.maxHealth = maxHealth
    this.heart = document.getElementById("heart")
    this.initHeart = this.heart.cloneNode(true)
    this.hearts = []
    this.heartsZone = document.getElementById("health")
    this.cloneHearts(maxHealth, this.heart, this.heartsZone, this.hearts)
  }

  cloneHearts(cloneTimes, node, heartsZone, resultArray) {
    let times=(n,f)=>{while(n-->0)f();}
    node.id = "heart-1"
    for(let i = 1; i <= cloneTimes; i++){
      let clonedNode = node.cloneNode(true)
      clonedNode.id = `heart-${1}`
      resultArray.push(clonedNode)
      this.heartsZone.appendChild(clonedNode)
    }
  }

  resetHealth() {
    this.health = this.maxHealth
    this.cloneHearts(this.health, this.initHeart, this.heartsZone, this.hearts)
  }

  removeLastHeart(hearts) {
    hearts.pop().remove()
  }

  decreaseHealth() {
    if(this.health > 0) {
      this.health--
      this.removeLastHeart(this.hearts)
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
