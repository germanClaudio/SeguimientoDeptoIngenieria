// const { MongoClient } = require("mongodb");
const mongoose = require('mongoose')
mongoose.set('strictQuery', false) // seteo Mongoose Eliminar si no hace nada!!

const advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000 }

const ClientsSchema = require('../models/clientes.models.js')
const UserSchema = require('../models/usuarios.models.js')
const SessionSchema = require('../models/sessions.models.js')

module.exports = class dbConnection {
    
    constructor(cnxStr) {
        this.cnxStr = cnxStr
        this.clientes = mongoose.model('Clientes', ClientsSchema)
        this.usuarios = mongoose.model('Usuarios', UserSchema)
        this.sessions = mongoose.model('Sessions', SessionSchema)
    }
    
    // -------- Conecta a la base de datos MONGO ----------
    async dbConnection() {
        try {
            // const uri = process.env.MONGO_URL_CONNECT_PROD;
            // const client = new MongoClient(uri);
            // await client.connect();
            // const dbName = process.env.DBMONGO_NAME;
            // const database = client.db(dbName);
            // console.log(`Connected to MongDB - ${database}`)
            mongoose.connect(this.cnxStr, advancedOptions)
            console.log('Connected to MongoDB Server 1-2-3 - UsuariosDaoFactory.js')
        } catch (error) {
            console.error('Error connection to DB: '+ error)
        }
    }

    // -------- Desonecta de la base de datos MONGO ----------
    async dbDisconnection() {
        try {
            mongoose.disconnect()
            console.log('Disconnected from MongoDB Server <-321->')
        } catch (error) {
           console.error('Error on disconnection from DB: '+error)
        }
    }

}