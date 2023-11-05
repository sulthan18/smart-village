import * as smartPaymentModel from "../models/smartPaymentModel";

export const getBills = (req, res) => {
  const bills = smartPaymentModel.getBills();
  res.json(bills);
};

export const createBill = (req, res) => {
  const { bill_type, due_date, amount, paid } = req.body;
  if (bill_type && due_date && amount !== undefined && paid !== undefined) {
    const bill = smartPaymentModel.createBill({
      bill_type,
      due_date,
      amount,
      paid,
    });
    res.status(201).json(bill);
  } else {
    res.status(400).json({ error: "Missing data" });
  }
};

export const getTransportTickets = (req, res) => {
  const transportTickets = smartPaymentModel.getTransportTickets();
  res.json(transportTickets);
};

export const createTransportTicket = (req, res) => {
  const { ticket_type, route, departure_time, price } = req.body;
  if (ticket_type && route && departure_time && price !== undefined) {
    const transportTicket = smartPaymentModel.createTransportTicket({
      ticket_type,
      route,
      departure_time,
      price,
    });
    res.status(201).json(transportTicket);
  } else {
    res.status(400).json({ error: "Missing data" });
  }
};
