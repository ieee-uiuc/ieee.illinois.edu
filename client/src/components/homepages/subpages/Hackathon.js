import React from "react"
import * as THREE from "three"
import BIRDS from "vanta/dist/vanta.birds.min.js"
import "./Hackathon.scss"
import { Link } from "react-router-dom"

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
      <div>
        <div className="hackathon" ref={this.vantaRef}>
          <div className="hackathon__overlay" />
          <h1 className="hackathon__title shadow">
            Come join Us For The First Ever <div>IEEE x HKN</div> Hackathon!
          </h1>
          <p className="hackathon__body">
            April 23rd-24th we are hosting a hackathon for all skill levels to
            compete in! More information to come . . .
          </p>
        </div>
        <div className="wave-info">
          <div className="waveWrapper waveAnimation">
            <div className="waveWrapperInner bgTop">
              <div
                className="wave waveTop"
                style={{
                  backgroundImage: `url(
                ${"http://front-end-noobs.com/jecko/img/wave-top.png"}
              )`,
                }}
              />
            </div>
            <div className="waveWrapperInner bgMiddle">
              <div
                className="wave waveMiddle"
                style={{
                  backgroundImage: `url(
                ${"http://front-end-noobs.com/jecko/img/wave-mid.png"}
              )`,
                }}
              />
            </div>
            <div className="waveWrapperInner bgBottom">
              <div
                className="wave waveBottom"
                style={{
                  backgroundImage: `url(
                ${"http://front-end-noobs.com/jecko/img/wave-bot.png"}
              )`,
                }}
              />
            </div>
          </div>
        </div>
        <div className="hackathon__info">
          <h1 className="hackathon__info__title">HAX Informtion:</h1>
          <p className="hackathon__info__text">
            IEEE and HKN are organizing a joint Hackathon the weekend of April
            23rd-24th! This weekend-long event includes a competition where
            students will construct a project of their choosing, and present it
            in front of a panel of judges. The basic necessary hardware
            components will be provided, and the focus is on microcontroller
            based designs that harness the creativity of engineering to solve
            real world problems. This event is open to all students on campus,
            and will be held in multiple rooms around the Electrical and
            Computer Engineering Building (ECEB). During the hackathon, we will
            also be running workshops where we educate students on the provided
            hardware, and more.
          </p>
          <div className="hax-container">
            <Link to={"/itinerary"} className="hax-container__button">
              Itinerary
            </Link>
          </div>
        </div>
        <div className="hackathon__prizes">
          <h1 className="hackathon__info__title">HAX Prizes and Rules:</h1>
          <p className="hackathon__info__text">
            Rules overview : ECEHax is a 48 hour hackathon beginning at 7:00pm
            on Friday April 22nd and ending at 7:00pm on Sunday April 24th.
            Teams of a max of 5 students are allowed and encouraged. There will
            be certain basic components provided by the Hackathon organizers for
            participants to experiment with. The project must be started and
            completed within these time frames, for students looking to use the
            basic components provided by the organizers, a project proposal must
            be presented to a panel of hackathon staff. This Hackathon is
            focused on hardware related projects and it is preferable that a
            microcontroller is used. Prizes TBD
          </p>
        </div>
      </div>
    )
  }
}
