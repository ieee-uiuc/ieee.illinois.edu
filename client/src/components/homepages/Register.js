import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';


const Register = () => {

    const [user, setUser] = useState({username:'',email:'',password:''});
    const [err,setErr] = useState('');



    // onchange inputs
const onchangeInput = (e)=>{
    const {name, value} = e.target;
    setUser({...user, [name]:value})
    setErr('');
    }


    // register submit

const registerSubmit = async (e)=>{
    e.preventDefault();

    try {

    const res = await axios.post(`/user/register`, {

     username:user.username,
    email:user.email,
    password:user.password

    })

    setUser({username:'',email:'', password:''});

    setErr(res.data.msg);



    } catch (err) {
        err.response.data.msg && setErr(err.response.data.msg)
    }
    }



    return (
        <div className="login">
          <div className="main-container">
              <h3>Register new admin</h3></div>
              <div className="login-center">
         <form onSubmit={registerSubmit}>
             <p>{err}</p>

            <label htmlFor="name">Name</label>
            <input type="text"
            placeholder="import name..."
             name="username"
             value={user.username}
             onChange={onchangeInput}
             required
            />

            <label htmlFor="email">Email</label>
            <input type="email"
             placeholder="import email..."
              name="email"
              value={user.email}
              onChange={onchangeInput}
             required
            />

          <label htmlFor="password">Password</label>
            <input type="password"
            placeholder="import password..."
            name="password"
            value={user.password}
            onChange={onchangeInput}
             required
            />

         <div className="login-btn">
             <button type="submit">Register</button>
             {/* <Link to="/login"><button >Login</button></Link> */}
             <Link to="/"><button >Home</button></Link>
         </div>
         </form>
        </div>
    </div>
    )
}

export default Register
