const ContainerMongoDB = require('../../contenedores/containerMongoDB.js')

class InfoDaoMongoDB extends ContainerMongoDB {
    constructor(cnxStr) {
        super(cnxStr)
    }
    
    async init() {
        await this.connection
   }

   async getInfoSystem(){
    }

    async getRandom(msg){
    }
        
    async disconnet() {
        await this.disconnection
    }
}

module.exports = InfoDaoMongoDB 