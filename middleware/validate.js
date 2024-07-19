const ObjectId = require('mongodb').ObjectId;

const validateSpillData = (data) => {
    if (typeof data.spill_id !== 'number') return 'Invalid spill_id';
    if (typeof data.width !== 'number') return 'Invalid width';
    if (typeof data.length !== 'number') return 'Invalid length';
    if (typeof data.material !== 'string') return 'Invalid material';
    if (typeof data.latitude !== 'number') return 'Invalid latitude';
    if (typeof data.longitude !== 'number') return 'Invalid longitude';
    return null;
};

const validateWorkerData = (data) => {
    if (typeof data.worker_id !== 'number') return 'Invalid worker_id';
    if (typeof data.first_name !== 'string') return 'Invalid first_name';
    if (typeof data.last_name !== 'string') return 'Invalid last_name';
    if (typeof data.position !== 'string') return 'Invalid position';
    return null;
};

const validateManagerData = (data) => {
    if (typeof data.manager_id !== 'number') return 'Invalid manager_id';
    if (typeof data.first_name !== 'string') return 'Invalid first_name';
    if (typeof data.last_name !== 'string') return 'Invalid last_name';
    if (typeof data.canSummarize !== 'boolean') return 'Invalid canSummarize type';
    return null;
};

const validateSummaryData = (data) => {
    if (typeof data.summary_id !== 'number') return 'Invalid summary_id';
    if (typeof data.spill_id !== 'number') return 'Invalid spill_id';
    if (typeof data.manager_id !== 'number') return 'Invalid manager_id';
    if (typeof data.summary !== 'string') return 'Invalid summary';
    return null;
};

const validateObjectId = (id) => {
    return ObjectId.isValid(id) && new ObjectId(id).toString() === id;
};

module.exports = { validateSpillData, validateObjectId, validateWorkerData, validateManagerData, validateSummaryData };