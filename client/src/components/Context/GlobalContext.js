import axios from 'axios';
import React, { createContext, useState, useEffect } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(false);
    const [about, setAbout] = useState([]);
    const [social, setSocial] = useState([]);
    const [technicals, setTechnicals] = useState([]);
    const [board, setBoard] = useState([]);
    const [loginFin, setLoginFin] = useState(true);
    const [dataFin, setDataFin] = useState(true);


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

        // ...for fetchning social...
        const res2 = await axios.get(`/Social`);
        // console.log(res2.data);
        setSocial(res2.data);

        // ...for fetching technicals
        const res4 = await axios.get(`/technical`);
        // console.log(res4.data);
        setTechnicals(res4.data);


        // ...for fetchning board...
        const res3 = await axios.get(`/fetchboard`);
        // console.log(res3.data);
        setBoard(res3.data);
    }

    useEffect(() => {
        try {
            if (dataFin) {
                fetchData();
            }

            //console.log(dataFin);
            return setDataFin(false)

            //    fetchAbout();
            //    fetchSocial();
            //    fetchTechnicals();
            //    fetchBoard();

        } catch (err) {
            console.log(err);
        }

    }, [dataFin])

    const state = {
        about: [about, setAbout],
        social: [social, setSocial],
        board: [board, setBoard],
        technicals: [technicals, setTechnicals],
        isLogin: [isLogin, setIsLogin]

    }

    return (
        <DataContext.Provider value={state}>
            {children}
        </DataContext.Provider>
    )
}
