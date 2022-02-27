import "./App.scss"
import React, { useContext, useEffect, lazy, Suspense } from "react"
import ReactGA from "react-ga"
import { Route } from "react-router-dom"
import { Element } from "react-scroll"
import { DataContext } from "./components/Context/GlobalContext"

import Navbar from "./components/homepages/Navbar"
import Landing from "./components/homepages/Landing"
import Footer from "./components/homepages/Footer"


const About = lazy(() => import("./components/homepages/About"))
const UpcomingEvents = lazy(() => import("./components/homepages/UpcomingEvents"))
const PastEvents = lazy(() => import("./components/homepages/PastEvents"))
const Advertising = lazy(() => import("./components/homepages/Advertising"))
const Contact = lazy(() => import("./components/homepages/Contact"))

const Board = lazy(()=> import("./components/homepages/subpages/Board"))
const Login = lazy(()=> import("./components/homepages/Login"))
const Register = lazy(()=> import("./components/homepages/Register"))
const SignUp = lazy(()=> import("./components/homepages/subpages/SignUp"))
const Calendar = lazy(()=> import("./components/homepages/subpages/Calendar"))

const Admin = lazy(()=> import("./components/adminComponents/Admin"))
const EditAbout = lazy(()=> import("./components/editComponents/EditAbout"))
const EditAdvertising = lazy(()=> import("./components/editComponents/EditAdvertising"))
const EditEvents = lazy(()=> import("./components/editComponents/EditEvents"))
const EditBoard = lazy(()=> import("./components/editComponents/EditBoard"))

const FadeIn = lazy(()=> import("./FadeIn"))

const renderLoader = () => <p>Loading</p>

require("dotenv").config()
const TRACKING_ID = process.env.REACT_APP_GOOGLE_TRACKING_ID // YOUR_OWN_TRACKING_ID

function App() {
  // ReactGA.initialize(TRACKING_ID)
  useEffect(() => {
    ReactGA.initialize(TRACKING_ID)
    ReactGA.pageview(window.location.pathname + window.location.search)
  }, [])

  const state = useContext(DataContext)
  const [isLogin, setIsLogin] = state.isLogin

  return (
    <div className="App">
      <Navbar />
      <Element className="Landing">
        <Route exact path="/" component={Landing} />
      </Element>

      <Suspense fallback={renderLoader()}>
        <FadeIn direction={"right"}>
          <Route exact path="/" component={About} />
        </FadeIn>
      </Suspense>
      <Suspense fallback={renderLoader()}>
        <FadeIn direction={"left"}>
          <Element className="UpcomingEvents">
            <Route exact path="/" component={UpcomingEvents} />
          </Element>
        </FadeIn>
      </Suspense>
      <Suspense fallback={renderLoader()}>
        <FadeIn direction={"right"}>
          <Element className="PastEvents">
            <Route exact path="/" component={PastEvents} />
          </Element>
        </FadeIn>
      </Suspense>
      <Suspense fallback={renderLoader()}>
        <FadeIn direction={"left"}>
          <Element className="advertising">
            <Route exact path="/" component={Advertising} />
          </Element>
        </FadeIn>
      </Suspense>
      <Suspense fallback={renderLoader()}>
        <FadeIn direction={"right"}>
          <Element className="Contact">
            <Route exact path="/" component={Contact} />
          </Element>
        </FadeIn>
      </Suspense>

      <Suspense fallback={renderLoader()}>
        <Route
          exact
          path="/login"
          render={() =>
            isLogin ? <Admin /> : <Login setIsLogin={setIsLogin} />
          }
        />
        <Route
          exact
          path="/register"
          render={() => (isLogin ? <Register /> : <Login />)}
        />
        {/* <Route exact path='/admin' {...console.log(isLogin)} render={() => isLogin ? <Admin /> : <Login />} /> */}
        <Route
          exact
          path="/admin"
          render={() => (isLogin ? <Admin /> : <Login />)}
        />
        <Route exact path="/editAdvertising/:id" component={EditAdvertising} />
        <Route exact path="/editEvent/:id" component={EditEvents} />
        <Route exact path="/editBoard/:id" component={EditBoard} />
        <Route exact path="/editAbout/:id" component={EditAbout} />
        <Route exact path="/join" component={SignUp} />
        <Route exact path="/board" component={Board} />
        <Route exact path="/calendar" component={Calendar} />
        <Route exact path="/about" component={About} />
      </Suspense>

      <Route component={Footer} />
    </div>
  )
}

export default App
