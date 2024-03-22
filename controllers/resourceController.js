const Resource = require('../models/resourceSchema');
const Users = require('../models/userSchema');
const jwt = require('jsonwebtoken');
const cloudinary = require('../utils/cloudinary');
const dotenv = require('dotenv');
dotenv.config();

const createResource = async (req, res) => {
  try {
   
    const resource = new Resource({...req.body, userId: req.user._id});
    const coach=await resource.save();
    let user= await Users.findById(req.user._id)
    if(coach){
      user.role="coach";
      user=await user.save()
    }
    res.status(201).json({
      success: true,
      message: 'Resource created successfully',
      user
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating resource',
      error: error.message
    });
  }
};

const getResources = async (req, res) => {
  try {
    const resources = await Resource.find({verified:true});
    res.status(200).json({
      success: true,
      message: 'Resources retrieved successfully',
       resources
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving resources',
      error: error.message
    });
  }
};

const getResourceById = async (req, res) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Resource retrieved successfully',
       resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error retrieving resource',
      error: error.message
    });
  }
};

const updateResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Resource updated successfully',
      data: resource
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating resource',
      error: error.message
    });
  }
};

const deleteResource = async (req, res) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({
        success: false,
        message: 'Resource not found'
      });
    }
    res.status(200).json({
      success: true,
      message: 'Resource deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting resource',
      error: error.message
    });
  }
};
  module.exports={createResource, updateResource, deleteResource, 
    getResources, getResourceById};