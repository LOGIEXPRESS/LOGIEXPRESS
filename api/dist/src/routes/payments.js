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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const stripe_1 = __importDefault(require("stripe"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY || "sk_test_51KHp41KDcJ8UiNxjhZPL9vNckvDi98mXuAEZAntgDhRSRe8ieczfK1u27oBRgj1ekxONHjpRev5oPjk3qqXiSJ4q00qs7thVnx", {
    apiVersion: "2020-08-27",
    appInfo: {
        name: "stripe-samples/accept-a-payment",
        url: "https://github.com/stripe-samples",
        version: "0.0.2",
    },
    typescript: true,
});
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const Stripe = require("stripe");
// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
// const app = express();
// const PORT = 8080;
// app.use("/stripe", express.raw({ type: "*/*" }));
// app.use(express.json());
// app.use(cors());
router.post("/pay", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const { id } = req.body;
        console.log(req.body.info.route.params.travel.price);
        const { eMail, lastName, name, id } = req.body.info.route.params.userReg;
        // console.log('aca llega el token','token',tokenn);
        // let decoded = jwt.verify(tokenn, config.jwtSecret)
        // let user = await User.findAll({ where: { idUserReg: decoded.id } })
        // let travel = await Travel.findAll({ where: { id: id} })
        // console.log('instan travel: ',travel)
        // res.send(travel)
        // console.log("AQUI ESTA TRAVEl PRICE", travel[0].price);
        // if (!eMail) return res.json({ key: 400, message: "Please enter a eMail" });
        const paymentIntent = yield stripe.paymentIntents.create({
            amount: parseInt(req.body.info.route.params.travel.price),
            currency: "usd",
            payment_method_types: ["card"],
            metadata: { eMail, lastName, name, id },
            description: 'logiexpress',
        });
        const clientSecret = paymentIntent.client_secret;
        res.json({ message: "Payment initiated", clientSecret });
    }
    catch (err) {
        next(err);
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
}));
// app.post("/stripe", async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;
//   try {
//     event = await stripe.webhooks.constructEvent(
//       req.body,
//       sig,
//       process.env.STRIPE_WEBHOOK_SECRET
//     );
//   } catch (err) {
//     console.error(err);
//     res.status(400).json({ message: err.message });
//   }
//   // Event when a payment is initiated
//   if (event.type === "payment_intent.created") {
//     console.log(`${event.data.object.metadata.name} initated payment!`);
//   }
//   // Event when a payment is succeeded
//   if (event.type === "payment_intent.succeeded") {
//     console.log(`${event.data.object.metadata.name} succeeded payment!`);
//     // fulfilment
//   }
//   res.json({ ok: true });
// });
exports.default = router;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
