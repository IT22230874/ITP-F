const express = require('express');
const {displaytender,publishtenders, displayePublishedTenders, editTender, analysisTenders, addBid, displaybid, deletePublishedTender, deleteBid, getpdf, getTenderById,} = require('../controllers/Tender/tender.controller.js');


const router = express.Router();

router.get('/displayrecievedtender', displaytender)
router.post('/publishtender', publishtenders)
router.get('/publishtenderdisplay', displayePublishedTenders)
router.get("/getTender/:id", getTenderById);
router.patch('/edittender/:id', editTender)
router.get('/analysis', analysisTenders)
router.post('/addbid', addBid)
router.get('/displaybid', displaybid)
router.delete('/delete/:id', deletePublishedTender)
router.delete('/deletebid/:id', deleteBid)
router.get('/getpdf', getpdf)


module.exports = router;