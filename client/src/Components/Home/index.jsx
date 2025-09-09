import { useEffect, useState } from "react";
import ExpenseItems from "../ExpenseItems";
import axios from 'axios';
import "./index.css";
import { useNavigate } from "react-router-dom";
function Home(){
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [expenses, setExpenses] = useState([]);
    const [form, SetForm] = useState({
        amount:"",
        category:"",
        date:"",
        note:""
    });
    const [filterDate, setFilterDate] = useState("");
    const [filterMonth, setFilterMonth] = useState("");

    const userId = localStorage.getItem("userId");
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    useEffect(()=>{
        if(!userId || !token){
            alert("Please Login First");
            navigate("/login");
            return;
        }
    },[userId, token, navigate]);

    const fetchAll = async (e) =>{
        try{
            const res = await axios.get( `${backendUrl}/api/expense/getUserExpense/${userId}`,
                {headers: {Authorization: `Bearer ${token}`}}
            );
            setExpenses(res.data)

        }catch(err){
            alert(err.response.data.msg);
        }
    }

    //filterByMonth
    const fetchByDate = async(e) =>{
        try{
            const res = await axios.get(backendUrl+ "/api/expense/by-date",
                {
                    params:{userId, date:filterDate},
                    headers:{Authorization: `Bearer ${token}`},
                }
            );
            setExpenses(res.data);
        }catch(err){
            alert(err.response.data.msg);
        }
    }

    //filterByMonth
    const fetchByMonth = async(e) =>{
        try{
            const res = await axios.get(backendUrl+ "/api/expense/by-month",
                {
                    params:{userId, month:filterMonth},
                    headers:{Authorization: `Bearer ${token}`},
                }
            );
            setExpenses(res.data);
        }catch(err){
            alert(err.response.data.msg);
        }
    }
    const [selectValue , setSelectValue] = useState("");

    function  handleChange(e){
        SetForm({...form, [e.target.name]: e.target.value})
    }

    //AddExpenses
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!form.amount || !form.category) return ;
        try{
            const res = await axios.post(backendUrl+"/api/expense/add",
                {...form, userId},
                {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                },
            );
            setExpenses((prev)=> [...prev, res.data]);
            SetForm({amount:"", category:"", date:"", note:"",});

        }catch(err){
            alert(err.response.data.msg);
        }
        setExpenses([...expenses,{...form, id: Date.now()}])
        SetForm({
            amount:"",
            category:"",
            date:"",
            note:""
        });
    }
    function handleDelete(id) {
        const filteredData = expenses.filter((item =>  id !== item.id));
        setExpenses(filteredData)
    }
    function handleSelect(e){
        const value = e.target.value;
        setSelectValue(value)
      
        if(value === "lowToHigh"){
            const lowToHighData = [...expenses].sort((a,b)=> a.amount - b.amount);
            setExpenses(lowToHighData)   
        }else if (value === 'highToLow'){
            const highToLowData = [...expenses].sort((a,b) => b.amount - a.amount);
            setExpenses(highToLowData)
        }
    }

    return(
        <div className="home-container">
            <h1>Track Your Expenses</h1>
            <form className="expenses-form" onSubmit={handleSubmit}>
                <input type="number" placeholder="Amount" name="amount" onChange={handleChange} value={form.amount} required/>
                <input type="text" placeholder="Category" name="category" onChange={handleChange} value={form.category} required/>
                <input type="date" placeholder="Date" name="date" onChange={handleChange} value={form.date}/>
                <input type="text" placeholder="Note" name="note" onChange={handleChange} value={form.note}/>
                <button type="submit">Add Expense</button>
            </form>
            <div className = "filter-section">
                <h1>Filter Expenses</h1>
                <input type="date" onChange={(e)=>setFilterDate(e.target.value)}/>
                <button onClick={fetchByDate}>Filter By Date</button>
                
               
                <input type="month" onChange={(e)=>setFilterMonth(e.target.value)}/>
                <button onClick={fetchByMonth}>Filter By Month</button>
                
                

                <button onClick={fetchAll}>Show All Expenses</button>
            </div>
           
                <div className="expenses-items">
                    <div className="head-section">
                        <h2>Recent Expenses</h2>
                        <div className="sort-item">
                            <img className="sort" src="./sort.jpg" alt="filter-icon"/>
                            <select className="price-sort" name="price"  value = {selectValue} onChange={handleSelect} disabled={expenses.length === 0}>
                                <option value="" >Sort</option>
                                <option value="lowToHigh">Low-High</option>
                                <option value="highToLow">High-Low</option>
                            </select>
                        </div>
                    </div>
                    
                    {expenses.length === 0 ? (
                    <h2>No Expenses</h2>
                    ):(
                        <ul>
                            {expenses.map((expense) =>(
                            <ExpenseItems key={expense.id} expense={expense} onDelete = {handleDelete}/>
                            ))}
                        </ul>
                    )}
                
                    
                </div>
                
            
        </div>
            
       
    )

}
export default Home;