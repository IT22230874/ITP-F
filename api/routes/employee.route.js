const express = require('express');
const {
    addEmployee,
    editEmployee,
    removeEmployee,
    displayEmployees,
    createGroup,
    deleteGroup,
    addMemberToGroup,
    removeMemberFromGroup,
    attendanceQr,
    getAttendance,
    attendanceAnalysis,
    getAttendanceSummary,
    displayAttendence,
    displayGroups
} = require('../controllers/Employee/employee.controller.js');

const router = express.Router();

// Employee routes
router.post('/employee', addEmployee);
router.patch('/employee/:id', editEmployee);
router.delete('/employee/:id', removeEmployee);
router.get('/employees', displayEmployees);

// Group routes
router.post('/group', createGroup);
router.delete('/group/:id', deleteGroup);
router.patch('/group/member/:id', addMemberToGroup);
router.delete('/group/member/:id', removeMemberFromGroup);

// Attendance routes
router.post('/attendance/qr', attendanceQr);
router.post('/attendance', getAttendance);
router.get('/attendance/analysis/:id', attendanceAnalysis);
router.get('/attendance/details', displayAttendence);
router.get('/attendance/summary', async (req, res, next) => {
    try {
        const summary = await getAttendanceSummary();
        res.json(summary);
    } catch (error) {
        console.error('Error fetching attendance summary:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.get("/groups", displayGroups);

module.exports = router;
