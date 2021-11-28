import React,{useContext,useState} from 'react'
import { Link, useHistory } from 'react-router-dom'
import './Login.scss'
import { DataContext } from '../Context/GlobalContext'

import axios from 'axios'

const Login = () => {

    const history =useHistory()
    const [user,setUser] = useState({username:'',email:'',password:''})
    const state = useContext(DataContext)
    const [isLogin, setIsLogin] = state.isLogin
    const[err,setErr] = useState('')

    const onChangeInput = (e)=>{
        const {name,value} = e.target
        setUser({...user,[name]:value})
        setErr('')
    }

    const loginSubmit = async (e)=>{
        e.preventDefault()

        try {
            const res = await axios.post(`/user/login`,{
                email:user.email,
                password:user.password
            })

            setUser({username:'',email:'',password:''})

            localStorage.setItem('toknStore', res.data.token)
            // console.log(res.data.token)
            setIsLogin(true)

            setErr(res.data.msg)
            history.push('/admin')
        } catch (err) {
            err.response.data.msg && setErr(err.response.data.msg)
        }
    }



    return (
        <>
            <div className="login">
                <div className="main-container">
                    <h3>Login for Admin</h3>
                    <div className="login-center">
                        <form onSubmit={loginSubmit}>
                            <p>{err}</p>
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                placeholder="input email..."
                                name="email"
                                value={user.email}
                                onChange={onChangeInput}
                                required
                            />
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="input password..."
                                name="password"
                                value={user.password}
                                onChange={onChangeInput}
                                required
                            />
                            <div className="login-btn">
                                <button type="submit">Login</button>
                                {/* <Link to="/register"><button>register</button></Link> */}
                                <Link to="/"><button>Home</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* register */}



        </>
    )
}

export default Login