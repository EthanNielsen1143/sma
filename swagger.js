const swaggerAutogen = require('swagger-autogen')();    

const doc = {
    info: {
        title: "Temples API",
        description: "A simple API to manage temples",
    },
    host: "webserv34134.onrender.com",
    schemes: ['https', 'http'],
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);