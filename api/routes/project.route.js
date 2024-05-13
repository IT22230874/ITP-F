const express = require('express');
const {
    addProject,
    getAllProjects,
    deleteProject,
    updateProject,
    getProjectById,
    getProjectByStatus,
    getProjectByClient,
    getProjectByTender,
    addResources,
    updateResources,
    increaseResourceQuantity,
    deleteResources,
    addMachines,
    updatedMachines,
    getMachineById,
    getMachinesByProject,
    increaseMachineQuantity,
    deleteMachines,
    addTeam,
    deleteTeam,
    addPhase,
    deletePhase,
    updatePhase,
    getPhaseById,
    getPhasesByProject,
    updatePhaseQuantity,
    analysis
} = require('../controllers/Project_management/project.controller.js');

const router = express.Router();
/*662f1f6601eecf7792af3a6d*/
router.post('/addproject', addProject);
router.get('/projects', getAllProjects);
router.get('/analysis', analysis);
router.delete('/deleteproject/:id', deleteProject);
router.patch('/updateproject/:id', updateProject);
router.get('/project/:id', getProjectById);
router.get('/projects/status/:status', getProjectByStatus);
router.get('/projects/client/:clientname', getProjectByClient);
router.get('/projects/tender/:isTender', getProjectByTender);

//add resources
router.post('/addresources', addResources);
router.patch('/updateresources/:id', updateResources);
router.patch('/increaseresourcequantity/:id', increaseResourceQuantity);
router.delete('/deleteresources/:id', deleteResources);

//add machines
router.post('/addmachines', addMachines);
router.put('/updatemachines/:id', updatedMachines);
router.get('/machine/:id', getMachineById);
router.get('/machines/project/:pid', getMachinesByProject);
router.put('/increasemachinequantity/:id', increaseMachineQuantity);
router.delete('/deletemachines/:id', deleteMachines);

//add groups
router.post('/addteam', addTeam);
router.delete('/deleteteam/:id', deleteTeam);
router.post('/addphase', addPhase);
router.delete('/deletephase/:id', deletePhase);
router.put('/updatephase/:id', updatePhase);
router.get('/phase/:id', getPhaseById);
router.get('/phases/project/:pid', getPhasesByProject);
router.put('/updatephasequantity/:id', updatePhaseQuantity);

module.exports = router;
