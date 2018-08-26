
//Dependencies

const server = require('./lib/server');
let workers = require('./lib/workers');
const cli = require('./lib/cli');


let app = {};

app.init = () =>{
    server.init();
    workers.init();

    //Start the command line
    setTimeout(()=>{
        cli.init();
    },50);
};


app.init();

module.exports = app;