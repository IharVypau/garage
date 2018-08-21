
//storing data


var fs=require('fs');
let path=require('path');
let helpers = require('./helpers');

//Container for the module

const lib={};

// Base dir of the data folder 
lib.baseDir=path.join(__dirname,'/../.data/');
lib.getPath=(callback)=>{
    callback(path.join(__dirname,'/../.data/'));
}

//Write data to a file
lib.create=(dir,file,data,callback)=>{
   // console.log(lib.baseDir+dir+'/'+file+'.json');
    //OPEN FILE
    fs.open(lib.baseDir+dir+'/'+file+'.json','wx',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            //conert to string
            let stringData=JSON.stringify(data);

            fs.writeFile(fileDescriptor,stringData,(err)=>{
                if(!err){
                    fs.close(fileDescriptor,(err)=>{
                        if(!err){
                            callback(false);
                        }else{
                            callback('error closing new file');
                        }
                    });
                }else{
                    callback('error writing new file');
                }
            });
        }else{
            callback('couldn\'t create new file it may exeist');
        }
    });
};

//Read data from file

lib.read=(dir,file,callback)=>{
    fs.readFile(lib.baseDir+dir+'/'+file+'.json','utf8',(err,data)=>{
        if(!err && data){
            let parseData= helpers.parseJsonToObject(data);
            callback(false,parseData);
        }else{
            callback(err,data);
        }
    });
};


lib.update=(dir,file,data,callback)=>{
    //Open file
    fs.open(lib.baseDir+dir+'/'+file+'.json','r+',(err,fileDescriptor)=>{
        if(!err && fileDescriptor){
            let stringData=JSON.stringify(data);
            fs.ftruncate(fileDescriptor,(err)=>{
                if(!err){
                    fs.writeFile(fileDescriptor,stringData,(err)=>{
                        if(!err){
                            fs.close(fileDescriptor,(err)=>{
                                if(!err){
                                    callback(false);
                                }else{
                                    callback('error closing  file');
                                }
                            });
                        }else{
                            calback('Error writing  existing file');
                        }
                    });
                }else{
                    callback('error truncating file');
                }
            });
        }else{
            callback('Couldnot open thefile for updating, it may not exist yet');
        }
    });
};


lib.delete=(dir,file,callback)=>{
    //ulilink the file
    fs.unlink(lib.baseDir+dir+'/'+file+'.json',(err)=>{
        if(!err){
            callback(false);
        }else{
            callback('Error delating file');
        }
    });
};


lib.list = (dir,callback)=>{
    fs.readdir(lib.baseDir+dir+'/',(err,data)=>{
        if(!err && data && data.length > 0){
            let trimmedFileNames = [];
            data.forEach((fileName)=>{
                trimmedFileNames.push(fileName.replace('.json',''));
            });
            callback(false,trimmedFileNames);
        }else{
            callback(err,data);
        }
    });
};
module.exports = lib;