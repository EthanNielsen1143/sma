const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validateWorkerData } = require('../middleware/validate');

const getAll = async (req, res) => {
    //#swagger.tags=['workers']
    const db = mongodb.getDatabase();
    workersCollection = db.db().collection('workers');
    const workers = await workersCollection.find().toArray();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(workers);
};

const getSingle = async (req, res) => {
    //#swagger.tags=['workers']
    const workerId = req.params.id;
    const objectId = ObjectId.createFromHexString(workerId);

    const db = mongodb.getDatabase();
    const result  = await db.db().collection('workers').findOne({ _id: objectId });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

};

const createWorker = async (req, res) => {
    //#swagger.tags=['workers']
    const workerData = {
        worker_id : req.body.worker_id,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        position : req.body.position
    };

    const validationError = validateWorkerData(workerData);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    try {
        const response = await mongodb.getDatabase().db().collection('workers').insertOne(workerData);
        if(response.acknowledged) {
            res.status(204).send('worker created successfully');
        } else {
            res.status(500).send('Error creating worker');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating worker');
    };

};

const updateWorker = async (req, res) => {
    //#swagger.tags=['workers']
    const workerId = new ObjectId(req.params.id);
    const workerData = {
        worker_id : req.body.worker_id,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        position : req.body.position
    };

    const validationError = validateWorkerData(workerData);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    try {
        const response = await mongodb.getDatabase().db().collection('workers').replaceOne({ _id: workerId }, workerData);
        if(response.modifiedCount > 0) {
            res.status(201).send('worker updated successfully');  
        } else {
            res.status(500).json(response.error || "Error updating worker");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating worker');
    };
};

const deleteWorker = async (req, res) => {
    //#swagger.tags=['workers']
    const workerId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db().collection('workers').deleteOne({ _id: workerId });
        if(response.deletedCount > 0) {
            res.status(204).send('worker deleted successfully');
        } else {
            res.status(500).send('Error deleting worker');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error deleting worker');
    }
};


module.exports = { getAll, getSingle, createWorker, updateWorker, deleteWorker};
