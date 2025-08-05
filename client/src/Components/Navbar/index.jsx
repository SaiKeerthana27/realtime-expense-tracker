import {Link} from 'react-router-dom';
import './index.css';

function Navbar(){
    return(
        <div className="nav-bar">
            <div className='logo-section'>
                <img className='logo' src = "./logo.png" alt="expense-tracker-logo"/>
                <h1 className='logo-heading'>Realtime Expense Tracker</h1>
            </div>
            <nav className="nav-links">
                <Link to ="/">Home</Link>
                <Link to ="/login">Login</Link>
                <Link to ="/signup">Sign Up</Link>
            </nav>
        </div>
    )

}
export default Navbar;