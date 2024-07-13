const swaggerAutogen = require('swagger-autogen')();    

const doc = {
    info: {
        title: "spills API",
        description: "A simple API to manage spills",
    },
    host: "localhost:8080",
    schemes: ['https', 'http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);