import { Response, Request, Router, NextFunction } from 'express';
import { User } from '../models/User';
import { Vehicle } from '../models/Vehicle';

const router = Router()

router.get("/vehicleDetails", async (req: Request, res: Response, next: NextFunction) => {
    const { idRole } = req.body
    try {

        let userCarrier = await User.findAll({ where: { idRole: idRole } })
        let vehicleDetails = await Vehicle.findAll({ where: { CarrierId: userCarrier[0].id } })
        const payload = {
            brand: vehicleDetails[0].brand,
            patent: vehicleDetails[0].patent,
            model: vehicleDetails[0].model,
            color: vehicleDetails[0].color,
            capacity: vehicleDetails[0].capacity,
            carrier: vehicleDetails[0].carrier,
        }
        return res.json(payload)
    } catch (error) {
        console.log(error);
    }
})

export default router;	