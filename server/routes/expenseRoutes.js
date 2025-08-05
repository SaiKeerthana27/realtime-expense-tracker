import express from 'express';
import {addExpense,getExpenseByDate,getExpenseByDay,getExpenseByUser} from '../controllers/expenseControllers.js';


const  router = express.Router();

router.post("/add",addExpense);
router.get("/getUserExpense/:userId", getExpenseByUser);
router.get("/by-date",getExpenseByDate);
router.get("/by-month",getExpenseByDay);


export default router;
