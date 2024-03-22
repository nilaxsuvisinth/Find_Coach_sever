const express=require("express")
const router= express.Router()
const {createResource, updateResource, deleteResource, 
    getResources, getResourceById} = require("../controllers/resourceController");
const {authenticate}=require('../middleware/authenticate')

router.post('/createResource',authenticate,  createResource);
router.put('/:id', updateResource);
router.delete('/:id', deleteResource);
router.get('/getresources', getResources);
router.get('/:id', getResourceById);

module.exports = router;