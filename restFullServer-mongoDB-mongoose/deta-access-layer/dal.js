//mongoose sifriya she-meAfsheret lanu hibuur la-mongoDb ve-levazeA peUlot kalot 
// mongoose- mithabrim darka paAm ahat lahen kedey lehithaber zarih lehikanes lmodule aze(dal) ba-app  

const mongoose=require("mongoose");
const { asap, async } = require("rxjs");
// const { config } = require("rxjs");
global.config=require("../config.json");

function connectAsync(){
    return new Promise((resolve,reject)=>{
        // connectString = mongodb://locallhost:27017/Products
        const connectString=`mongodb://${config.mongodb.host}:${config.mongodb.port}/${config.mongodb.database}`;
        mongoose.connect(connectString,(err,db)=>{ //db= database
            if(err){
                reject(err);
                return;
            }
            resolve(db);
        });        
    });
}

(async ()=>{ //run function without call him
        try{
            db=await connectAsync();
            console.log("we are connecting "+ db.name+" dataBase on mondoDB")
        }
        catch(err){
            console.error(err);
        }
    }
)();

