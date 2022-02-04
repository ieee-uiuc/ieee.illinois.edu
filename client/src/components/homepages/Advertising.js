import React, { useContext } from "react"
import "./About.scss"
import { DataContext } from "../Context/GlobalContext"
import { Link } from "react-router-dom"
import { ClickHandler } from "./functions/ClickHandler"

const Advertising = () => {
  const state = useContext(DataContext)
  const [advertising] = state.advertising
  const [dataAdvertising] = state.dataAdvertising
  // console.log(about)

  return (
    <div className="margin-about">
      <div className="about">
        <div className="about__title">Join IEEE</div>
        {dataAdvertising && (
          <div className="about__text">loading section...</div>
        )}
        {!dataAdvertising && (
          <div className="about__text">
            {advertising.map((item) => item.description)}
          </div>
        )}
        <div className="about__button-container">
          <Link
            onClick={ClickHandler("join", "advertising")}
            to={{
              pathname:
                "https://urldefense.com/v3/__https://docs.google.com/forms/d/1zA0xgMRalJrrod2eQyN9M018BsB_laT-l0Dy2yY6OAk/edit__;!!DZ3fjg!sdLC1sL6ZpoRBN8STlBmGPp98OhoKxIAxuNjrO6RO8a628GQRza8b5xafsn2fmS2sY8$",
            }}
            className="about__button-container__button"
            target="_blank"
          >
            apply
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Advertising
