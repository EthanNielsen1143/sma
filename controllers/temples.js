const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
    //#swagger.tags=['Temples']
    const db = mongodb.getDatabase();
    templesCollection = db.db().collection('temples');
    const temples = await templesCollection.find().toArray();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(temples);
};

const getSingle = async (req, res) => {
    //#swagger.tags=['Temples']
    const templeId = req.params.id;
    const objectId = ObjectId.createFromHexString(templeId);

    const db = mongodb.getDatabase();
    const result  = await db.db().collection('temples').findOne({ _id: objectId });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

};

const createTemple = async (req, res) => {
    //#swagger.tags=['Temples']
    const templeData = {
        temple_id : req.body.temple_id,
        additional_info : req.body.additional_info,
        name : req.body.name,
        location : req.body.location,
        dedicated: req.body.dedicated,
    };
    try {
        const response = await mongodb.getDatabase().db().collection('temples').insertOne(templeData);
        if(response.acknowledged) {
            res.status(204).send('temple created successfully');
        } else {
            res.status(500).send('Error creating temple');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating temple');
    };

};

const updateTemple = async (req, res) => {
    //#swagger.tags=['Temples']
    const templeId = new ObjectId(req.params.id);
    const templeColor = {
        temple_id : req.body.temple_id,
        additional_info : req.body.additional_info,
        name : req.body.name,
        location : req.body.location,
        dedicated: req.body.dedicated,
    };
    try {
        const response = await mongodb.getDatabase().db().collection('temples').replaceOne({ _id: templeId }, templeColor);
        if(response.modifiedCount > 0) {
            res.status(201).send('temple updated successfully');  
        } else {
            res.status(500).json(response.error || "Error updating temple");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating temple');
    };
};

const deleteTemple = async (req, res) => {
    //#swagger.tags=['Temples']
    const templeId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db().collection('temples').deleteOne({ _id: templeId });
        if(response.deletedCount > 0) {
            res.status(204).send('temple deleted successfully');
        } else {
            res.status(500).send('Error deleting temple');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error deleting temple');
    }
};


module.exports = { getAll, getSingle, createTemple, updateTemple, deleteTemple};
