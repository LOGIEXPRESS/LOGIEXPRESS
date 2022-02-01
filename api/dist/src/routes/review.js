"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const uuid_1 = require("uuid");
const Carrier_1 = require("../models/Carrier");
const Review_1 = require("../models/Review");
const Travel_1 = require("../models/Travel");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
// router.post('/review/user',async(req:Request,res:Response,next:NextFunction)=>{
//     //necesito el id de trave
//     //pesando como el user es el primero que hace una review
//     // const {idUserReg}=req.body//necesito el id del travel pq si no como lo identifico 
//     const {idTravel,Carrrier_raiting,Carrier_comment/*,travelId se genera al monmento de comenzar viaje en la ruta travel??? */}=req.body//review de user--->Carrier
//     // let user=await User.findAll({
//     //     where:{
//     //         idUserReg:idUserReg
//     //     }
//     // })
//     // let travel=await Travel.findAll({
//     //     where:{
//     //         userId:user[0].id
//     //     }
//     // })
//     let newReviewCarrier={
//         id:v4(),
//         Carrrier_raiting,
//         Carrier_comment,
//         travelId:idTravel//travel[0].id//necesito el id del travel lo poasen desde el front
//     }
//     try{
//         let reviewe=await Review.create(newReviewCarrier)
//         if(reviewe){
//             return res.status(200).send({mensaje:'Review creada',data:reviewe})
//         }
//     }catch(err){
//         next(err)
//     }
// })
router.post('/review/user', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //necesito el id de trave
    //pesando como el user es el primero que hace una review
    // const {idUserReg}=req.body//necesito el id del travel pq si no como lo identifico 
    const { idTravel, Carrrier_raiting, Carrier_comment /*,travelId se genera al monmento de comenzar viaje en la ruta travel??? */ } = req.body; //review de user--->Carrier
    console.log('llego review', idTravel, Carrrier_raiting, Carrier_comment);
    // let user=await User.findAll({
    //     where:{
    //         idUserReg:idUserReg
    //     }
    // })
    // let travel=await Travel.findAll({
    //     where:{
    //         userId:user[0].id
    //     }
    // })
    let review = yield Review_1.Review.findAll({ where: { travelId: idTravel } });
    if (!review.length) {
        let newReviewCarrier = {
            id: (0, uuid_1.v4)(),
            Carrrier_raiting,
            Carrier_comment,
            travelId: idTravel //travel[0].id//necesito el id del travel lo poasen desde el front
        };
        try {
            let reviewe = yield Review_1.Review.create(newReviewCarrier);
            return res.status(200).send({ mensaje: 'Review creada', data: reviewe });
        }
        catch (err) {
            next(err);
        }
    }
    else {
        let upDataRewie = yield review[0].update({ Carrrier_raiting, Carrier_comment });
        return res.status(200).send({ mensaje: 'Review update', data: upDataRewie });
    }
}));
// router.post('/review/carrier',async(req:Request,res:Response,next:NextFunction)=>{
//     //luego q el user hace una review la pude hacer el trasportista???
//     const {User_raiting,User_comment,idTravel}=req.body//review del carrier--->user
//     try{
//         let reviewUser= await Review.findAll({where:{travelId:idTravel}})//deberia tomar travelId 
//         if(!reviewUser.length){
//            return res.status(400).json({mensaje:'Rewiew not found'})
//         }else{
//             let upDating=await reviewUser[0].update({User_raiting,User_comment})
//            res.status(200).json({mensaje:'Review',data:upDating}) 
//         }
//     }catch(err){
//         next(err)
//     }
// }
// )
router.get('/reviewCarrier/:idUser_Reg', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser_Reg } = req.params;
    let user = yield User_1.User.findAll({
        where: {
            idUserReg: idUser_Reg
        }
    });
    if (!user.length) {
        return res.json({ menssage: 'not found User' });
    }
    else {
        let travel = yield Travel_1.Travel.findAll({ where: {
                userId: user[0].id
            } });
        if (!travel.length) {
            return res.json({ menssage: 'user not travels' });
        }
        let ids = []; //los id de los travels
        for (let i = 0; i < travel.length; i++) {
            ids.push(travel[i].id);
        }
        // res.send(`${ids.length}`)
        let reviews = [];
        let j = 0;
        while (j < ids.length) {
            let review = yield Review_1.Review.findOne({
                where: {
                    travelId: ids[j]
                }
            });
            if (!review) {
                j = j + 1;
                continue;
            }
            reviews.push(review);
            j = j + 1;
        }
        res.send(reviews);
    }
}));
router.post('/review/carrier', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    //luego q el user hace una review la pude hacer el trasportista???
    const { User_raiting, User_comment, idTravel } = req.body; //review del carrier--->user
    console.log('llego el post', User_raiting, User_comment, idTravel);
    // try{
    //     let reviewUser= await Review.findAll({where:{travelId:idTravel}})//deberia tomar travelId 
    //     if(!reviewUser.length){
    //        return res.status(400).json({mensaje:'Rewiew not found'})
    //     }else{
    //         let upDating=await reviewUser[0].update({User_raiting,User_comment})
    //        res.status(200).json({mensaje:'Review',data:upDating}) 
    //     }
    // }catch(err){
    //     next(err)
    // }
    ///////////////////////////////////////////////////
    let review = yield Review_1.Review.findAll({ where: { travelId: idTravel } });
    if (!review.length) {
        let newReviewCarrier = {
            id: (0, uuid_1.v4)(),
            User_raiting,
            User_comment,
            travelId: idTravel //travel[0].id//necesito el id del travel lo poasen desde el front
        };
        try {
            let reviewe = yield Review_1.Review.create(newReviewCarrier);
            return res.status(200).send({ mensaje: 'Review creada', data: reviewe });
        }
        catch (err) {
            console.log('llego al error', err);
            next(err);
        }
    }
    else {
        let upDataRewie = yield review[0].update({ User_raiting, User_comment });
        return res.status(200).send({ mensaje: 'Review update', data: upDataRewie });
    }
}));
router.get('/reviewUser/:idUser_Reg', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { idUser_Reg } = req.params;
    let carrier = yield Carrier_1.Carrier.findAll({
        where: {
            idUserReg: idUser_Reg
        }
    });
    if (!carrier.length) {
        return res.json({ menssage: 'not found User' });
    }
    else {
        let travel = yield Travel_1.Travel.findAll({ where: {
                carrierId: carrier[0].id
            } });
        if (!travel.length) {
            return res.json({ menssage: 'user not travels' });
        }
        let ids = []; //los id de los travels
        for (let i = 0; i < travel.length; i++) {
            ids.push(travel[i].id);
        }
        // res.send(`${ids.length}`)
        let reviews = [];
        let j = 0;
        while (j < ids.length) {
            let review = yield Review_1.Review.findOne({
                where: {
                    travelId: ids[j]
                }
            });
            if (!review) {
                j = j + 1;
                continue;
            }
            reviews.push(review);
            j = j + 1;
        }
        res.send(reviews);
    }
}));
exports.default = router;
