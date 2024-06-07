const ContainerMongoDBSessions = require('../../contenedores/containerMongoDB.js')
const mongoose = require('mongoose')
const Sessions = require('../../models/sessions.models.js')

const advancedOptions = { connectTimeoutMS: 30000, socketTimeoutMS: 45000 }

class SessionsDaoMongoDB extends ContainerMongoDBSessions {
    constructor(conexionStr) {
        super(conexionStr)
    }

    async init() {
        // await this.connectionSession
        mongoose.connect(this.cnxStr, advancedOptions)
        console.log('Connected to MongoDB Server 1-2-3 - SessionsDaoFactory.js')
   }

   async getAllSessions() {
       try {
            const sessions = await Sessions.find()
            
            if (!sessions) {
                    return new Error ('Error! No hay sessiones en la DB!')
            } else {
                    return sessions
            }
        } catch (error) {
            return new Error ('No hay sessiones en la DB!')
        }
    }

    async disconnet() {
        await this.disconnectionSession
        console.log('Disconnected from MongoDB Server')
    }
}

module.exports = SessionsDaoMongoDB 