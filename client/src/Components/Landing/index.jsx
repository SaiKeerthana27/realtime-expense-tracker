import { useNavigate } from 'react-router-dom';
import './index.css';

function Landing(){
    const navigate = useNavigate();
    return(
        <div className='landing-container'>
            <h1>Realtime Expense Tracker</h1>
            <p>Track your Expense Securely Safely</p>
            <div className='landing-buttons'>
                <button onClick={()=>navigate('/login')}>Login</button>
                <button onClick={()=> navigate('/signup')}>Signup</button>
            </div>
        </div>
       
         
    )
    
}
export default Landing;