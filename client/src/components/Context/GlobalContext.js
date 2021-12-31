import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [about, setAbout] = useState([]);
    const [social, setSocial] = useState([]);
    const [events, setEvents] = useState([]);
    const [board, setBoard] = useState([]);
    const [loginFin, setLoginFin] = useState(true);
    const [dataAbout, setDataAbout] = useState(true);
    const [dataSocial, setDataSocial] = useState(true);
    const [dataBoard, setDataBoard] = useState(true);
    const [dataEvents, setDataEvents] = useState(true);



    // checking token login
    const checkLogin = async () => {
        const token = localStorage.getItem('tokenStore');
        if (token) {
            const verified = await axios.get(`/user/verify`, { headers: { Authorization: token } })
            //  console.log(verified);

            setIsLogin(verified.data);
            if (verified.data === false) {
                return localStorage.clear();
            }
        } else {
            setIsLogin(false)
        }
    }

    useEffect(() => {
        try {
            if (loginFin) {
                checkLogin();
            }
            // console.log(loginFin);
            return setLoginFin(false)
        } catch (err) {
            console.log(err);
        }
    }, [loginFin])

    const fetchData = async () => {
        // ...for fetchning about...
        const res1 = await axios.get(`/fetchabout`);
        //console.log(res1.data);
        setAbout(res1.data);
        setDataAbout(false)

        // ...for fetchning social...
        const social = await axios.get(`/Social`);
        // console.log(res2.data);
        setSocial(social.data);
        setDataSocial(false)

        // ...for fetchning board...
        const res3 = await axios.get(`/fetchboard`);
        // console.log(res3.data);
        setBoard(res3.data);
        setDataBoard(false)

        // ...for fetching events
        const res4 = await axios.get(`/event`);
        // console.log(res4.data);
        setEvents(res4.data);
        setDataEvents(false)
    }

    useEffect(() => {
        try {
            if (dataAbout || dataSocial || dataBoard || dataEvents) {
                fetchData();
            }

        } catch (err) {
            console.log(err);
        }

    }, [])


    const state = {
        about: [about, setAbout],
        social: [social, setSocial],
        board: [board, setBoard],
        events: [events, setEvents],
        isLogin: [isLogin, setIsLogin],
        dataAbout: [dataAbout, setDataAbout],
        dataSocial: [dataSocial, setDataSocial],
        dataBoard: [dataBoard, setDataBoard],
        dataEvents: [dataEvents, setDataEvents],
        loginFin: [loginFin, setLoginFin]
    }

    return (
        <DataContext.Provider value={state}>
            {children}
        </DataContext.Provider>
    )
}
