import Expense from "../models/Expense.js";

const addExpense = async (req,res) =>{
    const {amount,category, date,note,userId} = req.body;
    const newExpense = new Expense({amount,category,date,note,userId});
    await newExpense.save();
    res.status(200).json(newExpense);
}

const getExpenseByUser = async (req,res) =>{
    const userId= req.params.userId.trim();
    const expenses = await Expense.find({userId});
    res.json(expenses)

}

const getExpenseByDate = async (req,res) =>{
    const {userId, date} = req.query;
    const expenses = await Expense.find({userId,date});
    res.json(expenses);
}

const getExpenseByDay = async (req,res) =>{
    const {userId, month} = req.query;
    const expenses = await Expense.find({
        userId,
        date: { $regex : `${month}`}
    })
    res.json(expenses);
}


export {addExpense,getExpenseByUser,getExpenseByDate,getExpenseByDay};
