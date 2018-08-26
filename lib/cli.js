/**
 * CLI - Related Tasks
 */

 //Dependencies
 let readline = require('readline');
 let util = require('util');
 const debug = util.debuglog('cli');
 const Events = require('events');
 class _events extends Events {};
 let e = new _events();

 //Instantiate CLI module object
 let cli = {};

//Input Handlers

e.on('man',(str)=>{
    cli.responders.help();

});
e.on('help',(str)=>{
    cli.responders.help();

});
e.on('exit',(str)=>{
    cli.responders.exit();

});
e.on('stats',(str)=>{
    cli.responders.stats();
});
e.on('list users',(str)=>{
    cli.responders.listUsers();

});
e.on('more user info',(str)=>{
    cli.responders.moreUserInfo(str);

});
e.on('list checks',(str)=>{
  cli.responders.listChecks(str);

});
e.on('more check infio',(str)=>{
    cli.responders.moreCheckInfo(str);

});
e.on('list logs',(str)=>{
    cli.responders.listLogs();

});
e.on('more log info',(str)=>{
    cli.responders.moreLogInfo(str);

});


//Responders obj
cli.responders = {

};

//Exit
cli.responders.exit = ()=>{
    process.exit(0);
};

//Stats
cli.responders.stats = ()=>{
    
    let stats ={
        
    };
};
cli.responders.listUser = ()=>{
    console.log('You asked to list users');
};
cli.responders.moreUserInfo = (str)=>{
    console.log('You asked for more user info',str);
};
cli.responders.listChecks = ()=>{
    console.log('You asked to list checks',str);
};
cli.responders.moreCheckInfo = (str)=>{
    console.log('You asked for more check info',str);
};
cli.responders.listLogs = ()=>{
    console.log('You asked to list logs');
};
cli.responders.moreLogInfo = (str)=>{
    console.log('You asked for more log info',str);
};



//Help man
cli.responders.help = ()=>{
   let commands = { 
    'exit': 'Kill a CLI (and a rest of application)',
    'man': 'Show this help page',
    'help': 'Alias of the man command',
    'stats': 'GEt statistics',
    'list users': 'Show a list of all users in the system',
    'more user info --{userId}': 'Show user details',
    'list cheks --up ---down': 'Show list of all checks of the system',
    'more check info --{checkId}': 'Show check details',
    'list logs': 'Show a list of all logs availible to be read',
    'more log info --{fileName}': 'Show speified log file',
   };

   //Show a header for the help page that is a wide as the screen
   cli.horizontalLine();
   cli.centered('CLI MANUAL');
   cli.horizontalLine();
   cli.verticalSpace(2);

   //Show each command followed by its explanation 
   for(let key in commands){
       if(commands.hasOwnProperty(key)){
           let value =  commands[key];
           let line = '\x1b[33m'+key+'\x1b[0m';
           let padding = 60 - line.length;
           for(i=0;i<padding;i++){
               line+=' ';
           }
           line+=value;
           console.log(line);
           cli.verticalSpace();
       }
   }
   cli.verticalSpace(1);
   cli.horizontalLine();
};

cli.verticalSpace = (lines)=>{
    lines = typeof(lines) == 'number' && lines >0 ? lines : 1;
    for(i=0;i<lines;i++){
        console.log('');
    }
};


cli.horizontalLine = ()=>{
    //Get avilible screen size
    let width = process.stdout.columns;
    let line  = '';
    for(i=0;i<width;i++){
        line+='-';
    }
    console.log(line);
};


cli.centered = (str)=>{
    //Get avilible screen size
    str = typeof(str) == 'string' && str.trim().length > 0 ? str.trim() : '';
    let width = process.stdout.columns;
    let leftPadding = Math.floor(((width - str.length) / 2));
    let line ='';
    for(i=0;i<leftPadding;i++){
        line+=' ';
    }
    line+=str;
    console.log(line);
};

//Input Processor
cli.processInput = (str)=>{
    str = typeof(str) == 'string' && str.trim().length >0 ? str : false;
    if(str){
        //Codify uniq strings
        let uniqInputs = [
            'man',
            'help',
            'exit',
            'stats',
            'list users',
            'more user info',
            'list cheks',
            'more check info',
            'list logs',
            'more log info'
        ];

        //Go through passible inputs
        let matchFound = false;
        let counter = 0;
        uniqInputs.some((input)=>{
            if(str.toLowerCase().indexOf(input) > -1){
                matchFound = true;
                e.emit(input,str);
                return true;
            }
        });
        // If no match found
        if(!matchFound){
            console.log('sorry, try again');
        }
    }
};

cli.init = ()=>{
    console.log('\x1b[34m%s\x1b[0m','CLI is running... ');
};

let _interface = readline.createInterface({
    input : process.stdin,
    output : process.stdout,
    prompt : '>'
});

//Create initial prompt
_interface.prompt();


//Handle each lline prompt separetely
_interface.on('line',(str)=>{
    //Send tot the input processor
    cli.processInput(str);

    //Reinitialize the prompt
    _interface.prompt();

});
// If the user stops the CLI, kill associated process
// 0 status code -everyfing is fine
_interface.on('close',()=>{
    process.exit(0);
});



 module.exports = cli;
