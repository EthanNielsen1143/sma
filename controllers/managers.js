const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validateManagerData } = require('../middleware/validate');

const getAll = async (req, res) => {
    //#swagger.tags=['managers']
    const db = mongodb.getDatabase();
    managersCollection = db.db().collection('managers');
    const managers = await managersCollection.find().toArray();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(managers);
};

const getSingle = async (req, res) => {
    //#swagger.tags=['managers']
    const managerId = req.params.id;
    const objectId = ObjectId.createFromHexString(managerId);

    const db = mongodb.getDatabase();
    const result  = await db.db().collection('managers').findOne({ _id: objectId });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

};

const createManager = async (req, res) => {
    //#swagger.tags=['managers']
    const managerData = {
        manager_id : req.body.manager_id,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        canSummarize : req.body.canSummarize
    };

    const validationError = validateManagerData(managerData);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    try {
        const response = await mongodb.getDatabase().db().collection('managers').insertOne(managerData);
        if(response.acknowledged) {
            res.status(204).send('manager created successfully');
        } else {
            res.status(500).send('Error creating manager');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating manager');
    };

};

const updateManager = async (req, res) => {
    //#swagger.tags=['managers']
    const managerId = new ObjectId(req.params.id);
    const managerData = {
        manager_id : req.body.manager_id,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        canSummarize : req.body.canSummarize
    };

    const validationError = validateManagerData(managerData);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    try {
        const response = await mongodb.getDatabase().db().collection('managers').replaceOne({ _id: managerId }, managerData);
        if(response.modifiedCount > 0) {
            res.status(201).send('manager updated successfully');  
        } else {
            res.status(500).json(response.error || "Error updating manager");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating manager');
    };
};

const deleteManager = async (req, res) => {
    //#swagger.tags=['managers']
    const managerId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db().collection('managers').deleteOne({ _id: managerId });
        if(response.deletedCount > 0) {
            res.status(204).send('manager deleted successfully');
        } else {
            res.status(500).send('Error deleting manager');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error deleting manager');
    }
};


module.exports = { getAll, getSingle, createManager, updateManager, deleteManager};
