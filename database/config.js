const mongoose = require('mongoose');

const dbConnection = async() => {
    try {

        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('Conexion a la base de datos exitosa')

    } catch (error) {
        console.log(error);
        throw new Error('Error en la conexion a la base de datos')
    }
}

module.exports = {
    dbConnection
}