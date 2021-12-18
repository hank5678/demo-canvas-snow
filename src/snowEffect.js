import { Vector2, range } from "./helper"
import Particle from "./particle"

export default class SnowEffect {
  #canvas = null
  #ctx = null
  #particles = []
  #running = false
  #frameTime = 0

  // 雪花參數
  #amount = 6000 // 數量
  #size = [0.5, 1.5] // 大小
  #speed = [40, 100] // 向下移動速度
  #swing = [0.1, 1] // 左右移動速度
  #amplitude = [20, 60] // 左右移動距離

  init() {
    this.#canvas = document.getElementById("snow")
    this.#ctx = this.#canvas.getContext("2d")
    this.resize(window.innerWidth, window.innerHeight)
    this.start()
  }

  start() {
    this.#running = true
    window.requestAnimationFrame(this.#loop.bind(this))
  }

  stop() {
    this.#running = false
  }

  resize(w, h) {
    this.#canvas.width = w
    this.#canvas.height = h
    this.#initParticles()
  }

  #loop(timestamp) {
    if (this.#running) {
      this.#clear() // 清除 canvas 畫布
      this.#update(timestamp) // 更新雪花的各項數值
      this.#draw() // 繪製雪花
      window.requestAnimationFrame(this.#loop.bind(this))
    }
  }

  #initParticles() {
    this.#particles = []
    for (let i = 0; i < this.#amount; i++) {
      let origin = new Vector2(range(0, this.#canvas.width), range(-this.#canvas.height, 0))
      let velocity = new Vector2(range(this.#swing[0], this.#swing[1]), range(this.#speed[0], this.#speed[1]))
      let size = range(this.#size[0], this.#size[1])
      let amplitude = range(this.#amplitude[0], this.#amplitude[1])

      this.#particles.push(new Particle(origin, velocity, size, amplitude))
    }
  }

  #update(timestamp) {
    const nowTime = timestamp
    const deltaTime = (nowTime - this.#frameTime) / 1000 // 計算這次與上次調用之間的時差
    this.#particles.forEach((particle) => {
      particle.update(deltaTime)
      if (particle.position.y - particle.size > this.#canvas.height) {
        // 重置雪花位置
        let origin = new Vector2(range(0, this.#canvas.width), range(-this.#canvas.height, 0))
        particle.reset(origin)
      }
    })

    this.#frameTime = timestamp // 記住這次的調用時間
  }

  #draw() {
    // 繪製雪花
    this.#ctx.fillStyle = "rgb(255,255,255)"
    this.#particles.forEach((particle) => {
      this.#ctx.fillRect(particle.position.x, particle.position.y, particle.size, particle.size)
    })
  }

  #clear() {
    // 清除畫布
    this.#ctx.clearRect(0, 0, this.#canvas.width, this.#canvas.height)
  }
}
