import "./styles.css"
import SnowEffect from "./snowEffect"

const snow = new SnowEffect()

window.addEventListener("resize", () => {
  snow.resize(window.innerWidth, window.innerHeight)
})

window.addEventListener("load", () => {
  snow.init()
})
