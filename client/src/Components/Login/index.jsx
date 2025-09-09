import {Link, useNavigate} from 'react-router-dom';
import './index.css';
import { useState } from 'react';
import axios from 'axios';
function Login(){
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async (e) =>{
        e.preventDefault();
        try{
            const res = await axios.post(backendUrl + "/api/auth/login",{
                email,
                password,
            });
            alert("Login Successfull");
            localStorage.setItem("token",res.data.token);
            localStorage.setItem("userId",res.data.user._id);
            navigate("/home");
        }catch(err){
          alert(err.response.data.msg);
        }
        

    }
    return(
        <div className='login-container'>
            <form className='login-form' onSubmit={handleLogin}>
                <h2>Welcome back ! Login to your account</h2>
                <input type="email" placeholder='Email' value = {email} onChange = {(e) => setEmail(e.target.value)} required/>
                <input type="password" placeholder='Password'value = {password} onChange = {(e) => setPassword(e.target.value)} required/>
                <button type="submit">Log in</button>
                <p>Don't have an account? <Link to="/signup">Sign up</Link></p>
            </form>

        </div>
    )
}
export default Login