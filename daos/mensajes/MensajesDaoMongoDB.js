const ContainerMongoDB = require('../../contenedores/containerMongoDB.js')
const mongoose = require('mongoose')
const Mensajes = require('../../models/mensajes.models.js')

const now = require('../../utils/formatDate.js')

class MensajesDaoMongoDB extends ContainerMongoDB {
    constructor(cnxStr) {
        super(cnxStr) 
    }

    async init() {
        await this.connection
   }
    
    async getAllMessages(){
        try {
            const messages = await Mensajes.find()
            if(messages.length > 0){
                return messages

            } else {
                return new Error ('No hay mensajes en la DB!')
            }
        } catch (error) {
            return new Error ('No hay mensajes en la DB!')
        }
    }

    async getMessageById(id) {
        if(id){
            try {
                const message = await Mensajes.findById({_id: id })
                return message
            } catch (error) {
                // logger.error("Error MongoDB getOneMensaje: ",error)
            }
        } else {
            try {
                const messages = await Mensajes.find()
                return messages
            } catch (error) {
                // logger.error("Error MongoDB getOneMessage: ",error)
            }
        }
    }

    async createNewMessage(mensaje){
                
        if(mensaje) {
            try {
                const newMessage = new Mensajes(mensaje)
                await newMessage.save()
                return newMessage
            } catch (error) {
                // logger.error(error)
            }
        } else {
            return new Error (`No se pudo crear el Mensaje!`)
        }
    }

    async deleteMessageById(id) {
        const itemMongoDB = await Mensajes.findById({_id: `${id}`})
        if(itemMongoDB) {
            try {
                const newValues = {
                    author: itemMongoDB.author,
                    text: itemMongoDB.text,
                    date: now,
                    status: false
                }
                const mensaje = await Mensajes.findOneAndUpdate(
                    { _id: id }, newValues , { new: true })
                    return mensaje
            } catch (error) {
                // logger.error("Error MongoDB deleteMenssage: ",error)
            }
        } else {
            // logger.info('El Mensaje no existe! ', itemMongoDB)
        }
    }


    async deleteAllMessages() {
        const itemMongoDB = await Mensajes.find()
        if(itemMongoDB) {
            try {
                const mensaje = await Mensajes.updateMany({}, { $set: { status: false } }, { new: true })
                return mensaje
            } catch (error) {
                // logger.error("Error MongoDB deleteAllMenssages: ",error)
            }
        } else {
            // logger.info('No hay Mensajes! ', itemMongoDB)
        }
    }

    async disconnet() {
        await this.disconnection
    }

}

module.exports = MensajesDaoMongoDB 