import './index.css';
function ExpenseItems({expense,onDelete}){
    const {id,amount,category,date,note} = expense;
    
    return(
        <li>
            <p>₹ {amount} - {category}</p>
            <div className='date'>
                <img className="date-image" src="./date.jpg" alt="date"/>
                <span>{date}</span>
            </div>
            <p className='note'>{note}</p>
            <button onClick={()=>onDelete(id)} className='delete-button'><img className="delete-icon" src="./delete.png" alt="delete-icon"/></button>
        </li>
    )
}
export default ExpenseItems;