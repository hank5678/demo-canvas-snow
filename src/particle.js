import { Vector2 } from "./helper"

export default class Particle {
  constructor(origin, velocity, size, amplitude) {
    this.origin = origin
    this.position = new Vector2(origin.x, origin.y)
    this.velocity = velocity
    this.size = size
    this.amplitude = amplitude
    this.dx = Math.random() * 100
  }

  reset(origin) {
    this.origin = origin
    this.position = new Vector2(origin.x, origin.y)
    this.dx = Math.random() * 100
  }

  update(deltaTime) {
    this.position.y += this.velocity.y * deltaTime
    this.dx += this.velocity.x * deltaTime
    this.position.x = this.origin.x + this.amplitude * Math.sin(this.dx)
  }
}
