import React from "react"
import * as THREE from "three"
import BIRDS from "vanta/dist/vanta.birds.min.js"
import "./Hackathon.scss"

export default class Hackathon extends React.Component {
  constructor() {
    super()
    this.vantaRef = React.createRef()
  }
  componentDidMount() {
    this.vantaEffect = BIRDS({
      el: this.vantaRef.current,
      THREE: THREE,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.0,
      minWidth: 200.0,
      scale: 1.0,
      scaleMobile: 1.0,
      backgroundColor: 0x141414,
      color1: 0x084f8c,
      color2: 0x0f3d59,
    })
  }
  componentWillUnmount() {
    if (this.vantaEffect) {
      this.vantaEffect.destroy()
    }
  }
  render() {
    return (
      <div className="hackathon" ref={this.vantaRef}>
        <div className="hackathon__overlay" />
        <h1 className="hackathon__title shadow">
          Come join Us For The First Ever <div>IEEE x HKN</div> Hackathon!
        </h1>
        <p className="hackathon__body">
          April 23rd-24th we are hosting a hackathon for all skill levels to compete in! More information to come . . .
        </p>
      </div>
    )
  }
}
