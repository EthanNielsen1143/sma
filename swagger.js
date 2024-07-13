const swaggerAutogen = require('swagger-autogen')();    

const doc = {
    info: {
        title: "spills API",
        description: "A simple API to manage spills",
    },
    host: "sma-86vz.onrender.com",
    schemes: ['https', 'http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);