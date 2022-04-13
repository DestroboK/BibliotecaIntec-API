const mongoose = require("mongoose");

const dbConnection = async()=> {
    try{
        mongoose.connect(process.env.BD_CNN, {
            useNewUrlParser:true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('DB Online');
    }
    catch (error){
        console.log(error);
        throw new Error('No se ha podido inicializar la base de datos');
    }

}

module.exports = {
    dbConnection
}