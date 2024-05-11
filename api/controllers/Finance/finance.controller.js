const ExpenseModel = require("../../modules/Expenses.model.js");
const IncomeModel = require("../../modules/Finance/Income.model.js");
const LiableModel = require("../../modules/Finance/Liability.model.js");
const prjFinModel = require("../../modules/Finance/ProjectFinance.model.js");

const addIncome = async (req, res, next) => {
    const { date, amount, source, department, description } = req.body;

    try {
        const income = new IncomeModel({
            date,
            amount,
            source,
            department,
            description,
        });
        await income.save();
        res.status(201).json({ message: "Income added successfully", data: income });
    } catch (error) {
        console.error("Error adding income:", error);
        res.status(500).json({ message: "Failed to add income" });
    }


};

const addExpense = async (req, res, next) => {
    const { date, amount, payee, department, description } = req.body;

    try {
        const latestExpense = await ExpenseModel.findOne().sort({ expenseid: -1 });
        const maxExpenseId = latestExpense ? latestExpense.expenseid : 0;

        const expense = new ExpenseModel({
            expenseid: maxExpenseId + 1,
            date,
            amount,
            payee,
            department,
            description,
        });
        await expense.save();
        res.status(201).json({ message: "Expense added successfully" , data: expense});
    } catch (error) {
        console.error("Error adding expense:", error);
        res.status(500).json({ message: "Failed to add expense" });
    }
};

const createLiabilities = async (req, res, next) => {
    const { startdate, enddate, amount, payee, department, description, installments, amountperinstallment } = req.body;

    const finished = 0;
    try {
        const liability = new LiableModel({
            startdate,
            enddate,
            amount,
            payee,
            department,
            description,
            installments,
            amountperinstallment,
            finished,
        });
        await liability.save();


        res.status(201).json({ message: "Liability created successfully", data: liability });
    } catch (error) {
        console.error("Error creating liability:", error);
        res.status(500).json({ message: "Failed to create liability" });
    }
};

const makePaymentForLiability = async (req, res, next) => {
    const { id } = req.params;
    const { date } = req.body;

    try {
        const liability = await LiableModel.findById(id);
        if (!liability) {
            return res.status(404).json({ message: "Liability not found" });
        }

        const finished = liability.finished + 1;
        await LiableModel.findByIdAndUpdate(id, { finished }, { new: true });

        const description = `Payment done for liability received from ${liability.payee}`;
        const expense = new ExpenseModel({
            expenseid: await getNextExpenseId(),
            date,
            amount: liability.amountperinstallment,
            payee: liability.payee,
            department: liability.department,
            description,
        });
        await expense.save();

        res.status(200).json({ message: "Payment for liability made successfully" });
    } catch (error) {
        console.error("Error making payment for liability:", error);
        res.status(500).json({ message: "Failed to make payment for liability" });
    }
};

const deleteLiability = async (req, res, next) => {
    const { id } = req.params;

    try {
        await LiableModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Liability deleted successfully" });
    } catch (error) {
        console.error("Error deleting liability:", error);
        res.status(500).json({ message: "Failed to delete liability" });
    }
};

const addProjectFinance = async (req, res, next) => {
    const { startdate, enddate,date, amount, payee, projectid, projectname, department, description, installments, amountperinstallment } = req.body;

    try {
        const projectFinance = new prjFinModel({
            startdate,
            enddate,
            date,
            amount,
            projectname,
            payee,
            projectid,
            department,
            description,
            installments,
            finished: 0,
            amountperinstallment,
        });
        const savedProjectFinance = await projectFinance.save();
        res.status(201).json({ message: "Project finance added successfully", data: savedProjectFinance });
    } catch (error) {
        console.error("Error adding project finance:", error);
        res.status(500).json({ message: "Failed to add project finance" });
    }
};

const projectIncome = async (req, res, next) => {
    const { id } = req.params;
    const { date } = req.body;

    try {
        const projectFinance = await prjFinModel.findById(id);
        if (!projectFinance) {
            return res.status(404).json({ message: "Project finance not found" });
        }

        const finished = projectFinance.finished + 1;
        await prjFinModel.findByIdAndUpdate(id, { finished }, { new: true });

        const income = new IncomeModel({
            date,
            amount: projectFinance.amountperinstallment,
            source: projectFinance.payee,
            department: "project",
            description: `Payment ${finished} for project ${projectFinance.projectname}`,
        });
        await income.save();

        res.status(200).json({ message: "Project income recorded successfully" });
    } catch (error) {
        console.error("Error recording project income:", error);
        res.status(500).json({ message: "Failed to record project income" });
    }
};

const deleteProject = async (req, res, next) => {
    const { id } = req.params;

    try {
        await prjFinModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Project finance deleted successfully" });
    } catch (error) {
        console.error("Error deleting project finance:", error);
        res.status(500).json({ message: "Failed to delete project finance" });
    }
};

async function getNextExpenseId() {
    const latestExpense = await ExpenseModel.findOne().sort({ expenseid: -1 });
    return latestExpense ? latestExpense.expenseid + 1 : 1;
}

const displayIncome = async (req, res, next) => {
    const income = await IncomeModel.find();
    return res.status(200).json(income);
};

const displayExpenses = async (req, res, next) => {
    const expenses = await ExpenseModel.find();
    return res.status(200).json(expenses);
};

const displayLiabilities = async (req, res, next) => {
    const liabilities = await LiableModel.find();
    return res.status(200).json(liabilities);
};

const displayProjectFinances = async (req, res, next) => {
    const projectFinances = await prjFinModel.find();
    return res.status(200).json(projectFinances);
};

module.exports = {
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
    displayProjectFinances,
};
