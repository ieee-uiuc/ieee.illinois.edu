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
    <div>
      {!dataAdvertising && (
        <div>
          {advertising.map((item) => (
            <div className="margin-about">
              <div className="about">
                <div className="about__title">{item.title}</div>

                <div className="about__text">{item.description}</div>

                <div className="about__button-container">
                  <Link
                    onClick={ClickHandler("join", "advertising")}
                    to={{
                      pathname:
                        `${item.link}`,
                    }}
                    className="about__button-container__button"
                    target="_blank"
                  >
                    {item.linkName}
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      {dataAdvertising && (
        <div className="margin-about">
          <div className="about">
            <div className="about__title">Loading Section...</div>
            {dataAdvertising && <div className="about__text">loading</div>}
            {!dataAdvertising && (
              <div className="about__text">
                {advertising.map((item) => item.description)}
              </div>
            )}
            <div className="about__button-container">
              <Link
                onClick={ClickHandler("join", "advertising")}
                to={{
                  pathname: "/",
                }}
                className="about__button-container__button"
                target="_blank"
              >
                loading...
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Advertising
