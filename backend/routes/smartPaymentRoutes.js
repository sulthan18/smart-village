import express from "express";
import * as smartPaymentController from "../controllers/smartPaymentController";

const router = express.Router();

router.get("/bills", smartPaymentController.getBills);
router.post("/bills", smartPaymentController.createBill);

router.get("/transport_tickets", smartPaymentController.getTransportTickets);
router.post("/transport_tickets", smartPaymentController.createTransportTicket);

export default router;
