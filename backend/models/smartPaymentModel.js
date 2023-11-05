import fs from "fs";
import path from "path";

const dataPath = path.join(__dirname, "../data/smartPaymentData.json");

const getSmartPaymentData = () => {
  const rawData = fs.readFileSync(dataPath, "utf8");
  return JSON.parse(rawData);
};

const saveSmartPaymentData = (data) => {
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), "utf8");
};

export const getBills = () => {
  const smartPaymentData = getSmartPaymentData();
  return smartPaymentData.bills;
};

export const createBill = (bill) => {
  const smartPaymentData = getSmartPaymentData();
  bill.id = smartPaymentData.bills.length + 1;
  smartPaymentData.bills.push(bill);
  saveSmartPaymentData(smartPaymentData);
  return bill;
};

export const getTransportTickets = () => {
  const smartPaymentData = getSmartPaymentData();
  return smartPaymentData.transport_tickets;
};

export const createTransportTicket = (ticket) => {
  const smartPaymentData = getSmartPaymentData();
  ticket.id = smartPaymentData.transport_tickets.length + 1;
  smartPaymentData.transport_tickets.push(ticket);
  saveSmartPaymentData(smartPaymentData);
  return ticket;
};
