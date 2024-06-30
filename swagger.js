const swaggerAutogen = require('swagger-autogen')();    

const doc = {
    info: {
        title: "Temples API",
        description: "A simple API to manage temples",
    },
    host: "localhost:8080",
    schemes: ['https', 'http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);