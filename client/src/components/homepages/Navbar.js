import React, { useContext, useState } from "react"
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { DataContext } from '../Context/GlobalContext';
import { scroller } from 'react-scroll';
import { ClickHandler } from './functions/ClickHandler'
import Logo from '../../images/ieee-logo.png';



const Navbar = () => {

    const state = useContext(DataContext)

    const [isLogin, setIsLogin] = state.isLogin

    const [toggle, setToggle] = useState(false);


    // for scrolling navbar elements
    const scrollToElement = (element) => {
        scroller.scrollTo(element, {
            duration: 750,
            delay: 10,
            smooth: true,
            offset: -80
        })
    }

    // for toggle
    const actToggle = () => {
        setToggle(!toggle)
    }

    // for close navbar if is open
    const closeNavbar = () => {
        if (toggle === true) {
            setToggle(false)
        }
    }

    const logOutSubmit = () => {
        localStorage.clear()
        setIsLogin(false)
    }

    return (
      <div className="nav-container">
        <nav>
          <div className="logoBtn">
            <Link to="/" onClick={() => scrollToElement("Landing")}>
              <img src={Logo} loading="lazy" alt="" />
            </Link>

            <div className="btn" onClick={actToggle}>
              <div className={toggle ? "bar1 animateBar" : "bar bar1"}></div>
              <div className={toggle ? "bar2 animateBar" : "bar bar2"}></div>
              <div className={toggle ? "bar3 animateBar" : " bar3"}></div>
            </div>
          </div>

          <div className="links-container">
            <ul
              className={toggle ? "new-links links" : "links"}
              onClick={closeNavbar}
            >
              {/* <li onClick={() => scrollToElement('Home')}><Link to="/">Home</Link></li> */}
              <li key="landing" onClick={() => scrollToElement("Landing")}>
                <Link to="/">Home</Link>
              </li>
              <li key="about" onClick={() => scrollToElement("about")}>
                <Link to="/">About</Link>
              </li>
              <li
                key="events"
                onClick={() => scrollToElement("UpcomingEvents")}
              >
                <Link to="/">Events</Link>
              </li>
              {/* <li onClick={() => scrollToElement('Board')}><Link to="/">Events</Link></li> */}
              {/* <li onClick={() => scrollToElement('PastEvents')}><Link to="/">previous</Link></li> */}
              <li key="contact" onClick={() => scrollToElement("Contact")}>
                <Link to="/">Contact</Link>
              </li>
              <li key="cal">
                <Link
                  onClick={ClickHandler("calendar", "navbar")}
                  to="/Calendar"
                >
                  Calendar
                </Link>
              </li>
              <li key="mem">
                <Link
                  onClick={ClickHandler("membership", "navbar")}
                  to="/Membership"
                >
                  Membership
                </Link>
              </li>
              <li key="admin" className={isLogin ? "" : "adminLi"}>
                <Link to={isLogin ? "/admin" : "/"}>
                  {isLogin ? <div className="admin">Admin</div> : ""}
                </Link>
              </li>
              <li key="register" className={isLogin ? "" : "adminLi"}>
                <Link to={isLogin ? "/register" : "/"}>
                  {isLogin ? <div className="admin">Register</div> : ""}
                </Link>
              </li>
              <li key="login" onClick={logOutSubmit}>
                {" "}
                <Link to={isLogin ? "/" : "/login"}>
                  {isLogin ? "Logout" : "Login"}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    )
}

export default Navbar
