import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
    userId: {type:mongoose.Schema.Types.ObjectId, ref:"User", require:true},
    amount:{type:Number, require:true},
    category:{type:String, require:true},
    date:{type:String},
    note:{type:String}
})

const Expense = mongoose.model("Expense", expenseSchema, "expense-data");
export default Expense;