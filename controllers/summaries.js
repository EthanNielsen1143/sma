const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validateSummaryData } = require('../middleware/validate');

const getAll = async (req, res) => {
    //#swagger.tags=['summaries']
    const db = mongodb.getDatabase();
    summariesCollection = db.db().collection('summaries');
    const summaries = await summariesCollection.find().toArray();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(summaries);
};

const getSingle = async (req, res) => {
    //#swagger.tags=['summaries']
    const summaryId = req.params.id;
    const objectId = ObjectId.createFromHexString(summaryId);

    const db = mongodb.getDatabase();
    const result  = await db.db().collection('summaries').findOne({ _id: objectId });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

};

const createSummary = async (req, res) => {
    //#swagger.tags=['summaries']
    const summaryData = {
        summary_id : req.body.summary_id,
        spill_id : req.body.spill_id,
        manager_id : req.body.manager_id,
        summary : req.body.summary
    };

    const validationError = validateSummaryData(summaryData);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    try {
        const response = await mongodb.getDatabase().db().collection('summaries').insertOne(summaryData);
        if(response.acknowledged) {
            res.status(204).send('summary created successfully');
        } else {
            res.status(500).send('Error creating summary');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating summary');
    };

};

const updateSummary = async (req, res) => {
    //#swagger.tags=['summaries']
    const summaryId = new ObjectId(req.params.id);
    const summaryData = {
        summary_id : req.body.summary_id,
        spill_id : req.body.spill_id,
        manager_id : req.body.manager_id,
        summary : req.body.summary
    };

    const validationError = validateSummaryData(summaryData);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    try {
        const response = await mongodb.getDatabase().db().collection('summaries').replaceOne({ _id: summaryId }, summaryData);
        if(response.modifiedCount > 0) {
            res.status(201).send('summary updated successfully');  
        } else {
            res.status(500).json(response.error || "Error updating summary");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating summary');
    };
};

const deleteSummary = async (req, res) => {
    //#swagger.tags=['summaries']
    const summaryId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db().collection('summaries').deleteOne({ _id: summaryId });
        if(response.deletedCount > 0) {
            res.status(204).send('summary deleted successfully');
        } else {
            res.status(500).send('Error deleting summary');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error deleting summary');
    }
};


module.exports = { getAll, getSingle, createSummary, updateSummary, deleteSummary};
