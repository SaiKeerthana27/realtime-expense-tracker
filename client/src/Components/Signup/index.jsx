import {Link, useNavigate} from 'react-router-dom';
import './index.css';
import { useState } from 'react';
import axios from 'axios';
function Signup(){
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) =>{
        e.preventDefault();
        try{
            await axios.post(backendUrl + "/api/auth/signup", {
                name,
                email,
                password,
            });
            alert("Signup successfull");
            navigate("/login");

        }catch(err){
            alert(err.response.data.msg);
        }

    }
    return(
        <div className='signup-container'>
            <form className='signup-form' onSubmit={handleSignup}>
                <h2>Create a Realtime Expense Tracker account</h2>
                <input type="text" placeholder='Full Name' value={name} required onChange = {(e) => setName(e.target.value)}/>
                <input type="email" placeholder='Email'  value = {email} required onChange = {(e) => setEmail(e.target.value)}/>
                <input type="password" placeholder='Your Password' value={password} required onChange = {(e) => setPassword(e.target.value)}/>
                <button type="submit">Sign up</button>
                <p>Already have an account? <Link to="/login">Log in</Link></p>
            </form>

        </div>
    )
}
export default Signup