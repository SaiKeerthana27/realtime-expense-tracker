import './index.css';
function Footer(){
    return(
        <div className="footer">
            <p>© {new Date().getFullYear()}- Realtime Expense Tracker. All Rights Reserved.</p>
                
        </div>
    )
}
export default Footer;