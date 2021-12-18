export const range = (min = 0, max = 1) => {
  return min + Math.random() * (max - min)
}

export function Vector2(x = 0, y = 0) {
  this.x = x
  this.y = y
}
