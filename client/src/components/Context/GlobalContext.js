import axios from "axios"
import React, { createContext, useState, useEffect } from "react"

export const DataContext = createContext()

export const DataProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false)
  const [about, setAbout] = useState([])
  const [advertising, setAdvertising] = useState([])
  const [events, setEvents] = useState([])
  const [board, setBoard] = useState([])
  const [member, setMember] = useState([])
  const [loginFin, setLoginFin] = useState(true)
  const [dataAbout, setDataAbout] = useState(true)
  const [dataAdvertising, setDataAdvertising] = useState(true)
  const [dataBoard, setDataBoard] = useState(true)
  const [dataEvents, setDataEvents] = useState(true)
  const [dataMember, setDataMember] = useState(true)


  // checking token login
  const checkLogin = async () => {
    const token = localStorage.getItem("tokenStore")
    if (token) {
      const verified = await axios.get(`/user/verify`, {
        headers: { Authorization: token },
      })
      //  console.log(verified);

      setIsLogin(verified.data)
      if (verified.data === false) {
        return localStorage.clear()
      }
    } else {
      setIsLogin(false)
    }
  }

  useEffect(() => {
    try {
      if (loginFin) {
        checkLogin()
      }
      // console.log(loginFin);
      return setLoginFin(false)
    } catch (err) {
      console.log(err)
    }
  }, [loginFin])

  const fetchData = async () => {
    // ...for fetchning about...
    const about = await axios.get(`/fetchabout`)
    //console.log(about.data);
    about.data.sort(function (a, b) {
      return a.product_id - b.product_id
    })
    setAbout(about.data)
    setDataAbout(false)

    // ...for fetchning advertising...
    const advertising = await axios.get(`/Advertising`)
    // console.log(res2.data);
    advertising.data.sort(function (a, b) {
      return a.product_id - b.product_id
    })
    setAdvertising(advertising.data)
    setDataAdvertising(false)

    // ...for fetchning board...
    const board = await axios.get(`/fetchboard`)
    // console.log(board.data);
    board.data.sort(function (a, b) {
      return a.product_id - b.product_id
    })
    setBoard(board.data)
    setDataBoard(false)

    // ...for fetching events
    const event = await axios.get(`/event`)
    // console.log(event.data);
    event.data.sort(function (a, b) {
      return a.product_id - b.product_id
    })
    setEvents(event.data)
    setDataEvents(false)

    // ...for fetchning members...
    const member = await axios.get(`/fetchmember`)
    // console.log(member.data);
    member.data.sort(function (a, b) {
      return a.product_id - b.product_id
    })
    setMember(member.data)
    setDataMember(false)
  }

  useEffect(() => {
    try {
      if (dataAbout || dataAdvertising || dataBoard || dataEvents || dataMember) {
        fetchData()
      }
    } catch (err) {
      console.log(err)
    }
  }, [])

  const state = {
    about: [about, setAbout],
    advertising: [advertising, setAdvertising],
    board: [board, setBoard],
    events: [events, setEvents],
    isLogin: [isLogin, setIsLogin],
    member: [member, setMember],
    dataAbout: [dataAbout, setDataAbout],
    dataAdvertising: [dataAdvertising, setDataAdvertising],
    dataBoard: [dataBoard, setDataBoard],
    dataEvents: [dataEvents, setDataEvents],
    dataMember: [dataMember, setDataMember],
    loginFin: [loginFin, setLoginFin],
  }

  return <DataContext.Provider value={state}>{children}</DataContext.Provider>
}
