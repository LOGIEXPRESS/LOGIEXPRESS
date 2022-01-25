import app from "./src/app";
import { Travel } from './src/models/Travel';
import { sequelize } from "./src/db";
import { uuid } from 'uuidv4';
import { callbackify } from "util";
const { Op } = require("sequelize");
const server = require('http').createServer(app);
const io = require('socket.io')(server, { cors: { origin: "*" } });
interface error {
    err: string
}
///begin Sokets



io.on("connection", (socket: any) => {
    console.log("User conneted: " + socket.id)

    socket.on("message", async (data: any, callback: any) => {
        console.log(data)

        const { id, orig, destination, weight, price, description } = data


        /* const requestTravel = await Travel.findAll() */
        const requestTravel = await Travel.findAll({ where: { userId: id , carrierId:{[Op.eq]: null} }})
       
        /* console.log("ESTO ES REQUEST TRAVEL", requestTravel[0]?.carrierId ) */
        if( requestTravel.length === 0 || requestTravel[0]?.carrierId !== null) {
            
            let TravelId = uuid();
            var newViaje = {
                id: TravelId,
                orig,
                destination,
                weight,
                price,
                description,
                userId: id
            }
            let traveles = await Travel.create(newViaje)
            // console.log('traveles: ',traveles);
            socket.broadcast.emit('message', newViaje)
            let travel = await Travel.findAll()
            socket.broadcast.emit('Travel', travel)
    
            callback({
                status: TravelId
            });
        } else {
            console.log("ESTO ES,", requestTravel[0].id )
            callback({
                status: ["Ya tiene un viaje en proceso", requestTravel[0].id]
            })
        }


    })
    socket.on("response", async (data: any) => {
        console.log(data)
        const upTravel = await Travel.update({ carrierId: data.carrierId }, { where: { userId: data.userId, carrierId: { [Op.eq]: null } } });
        socket.broadcast.emit('response', data)
    })


    socket.on("delete", async (data: any , callback: any) => {
        console.log('Esto es lo que se debe borrar', data)
        const deltTravel = await Travel.destroy({ where: { id: data.id }});
      
    })
 


    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
    })
})


////end sokets

sequelize
    .sync({ force: false, logging: false })
    // .then(async () => {
    // 	// await resApiUsers()

    // })
    .then(() => {
        console.log('base de datos conectada! :D')
        server.listen("postgres://euhhnlvlorbgaz:b9b70900233f499937ea603bc58f8340bd6aa51cf0b0038889526a2a3845ed67@ec2-3-225-41-234.compute-1.amazonaws.com:5432/d3nem1qloocqg" || 3001, function () {
            console.log('App is listening on port 3001!');
        });
    })
    .catch((err: error) => console.error(err));



