const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const { validateSpillData, validateObjectId } = require('../middleware/validate');

const getAll = async (req, res) => {
    //#swagger.tags=['spills']
    const db = mongodb.getDatabase();
    spillsCollection = db.db().collection('spills');
    const spills = await spillsCollection.find().toArray();
    
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(spills);
};

const getSingle = async (req, res) => {
    //#swagger.tags=['spills']
    const spillId = req.params.id;
    if (!validateObjectId(spillId)) {
        res.status(400).send('Invalid spill ID');
        return;
    }
    const objectId = ObjectId.createFromHexString(spillId);

    const db = mongodb.getDatabase();
    const result  = await db.db().collection('spills').findOne({ _id: objectId });

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(result);

};

const createSpill = async (req, res) => {
    //#swagger.tags=['spills']
    const validationError = validateSpillData(req.body);
    if (validationError) {
        return res.status(400).send(validationError);
    }
    const spillData = {
        spill_id : req.body.spill_id,
        width : req.body.width,
        length : req.body.length,
        material : req.body.material,
        latitude : req.body.latitude,
        longitude : req.body.longitude
    };
    try {
        const response = await mongodb.getDatabase().db().collection('spills').insertOne(spillData);
        if(response.acknowledged) {
            res.status(204).send('spill created successfully');
        } else {
            res.status(500).send('Error creating spill');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error creating spill');
    };

};

const updateSpill = async (req, res) => {
    //#swagger.tags=['spills']
    const spillId = new ObjectId(req.params.id);
    const validationError = validateSpillData(req.body);
    if (validationError) {
        return res.status(400).send(validationError);
    }

    const spillData = {
        spill_id : req.body.spill_id,
        width : req.body.width,
        length : req.body.length,
        material : req.body.material,
        latitude : req.body.latitude,
        longitude : req.body.longitude
    };
    try {
        const response = await mongodb.getDatabase().db().collection('spills').replaceOne({ _id: spillId }, spillData);
        if(response.modifiedCount > 0) {
            res.status(201).send('spill updated successfully');  
        } else {
            res.status(500).json(response.error || "Error updating spill");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error updating spill');
    };
};

const deleteSpill = async (req, res) => {
    //#swagger.tags=['spills']
    const spillId = new ObjectId(req.params.id);
    try {
        const response = await mongodb.getDatabase().db().collection('spills').deleteOne({ _id: spillId });
        if(response.deletedCount > 0) {
            res.status(204).send('spill deleted successfully');
        } else {
            res.status(500).send('Error deleting spill');
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('Error deleting spill');
    }
};


module.exports = { getAll, getSingle, createSpill, updateSpill, deleteSpill};
