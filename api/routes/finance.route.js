const express = require('express');
const router = express.Router();
const {
    addIncome,
    addExpense,
    createLiabilities,
    makePaymentForLiability,
    deleteLiability,
    addProjectFinance,
    projectIncome,
    deleteProject,
    displayIncome,
    displayExpenses,
    displayLiabilities,
    displayProjectFinances
} = require('../controllers/Finance/finance.controller.js');

// Routes for handling income
router.post('/incomes',  addIncome);

// Routes for handling expenses
router.post('/expenses',  addExpense);

// Routes for handling project finance
router.get('/income',  displayIncome);
router.get('/expense',  displayExpenses);
router.get('/liability',  displayLiabilities);
router.get('/project-finances',  displayProjectFinances);

// Routes for handling liabilities
router.post('/liabilities',  createLiabilities);
router.post('/liabilities/:id/pay',  makePaymentForLiability);
router.delete('/liabilities/:id',  deleteLiability);

// Routes for handling project finance
router.post('/project-finance',  addProjectFinance);
router.post('/project-finance/:id/income',  projectIncome);
router.delete('/project-finance/:id',  deleteProject);

module.exports = router;
