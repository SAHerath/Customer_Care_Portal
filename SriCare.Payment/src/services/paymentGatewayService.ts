// import axios from "axios";

import axiosInstance from "./axiosClient";

// const PAYMENT_GATEWAY_BASE_URL = (port: string) =>
//   `https://localhost:${port}/mock-payment-gateway`;

export const initiatePayment = async (paymentDetails: any) => {
  // const port = process.env.GATEWAY_PORT;
  const response = await axiosInstance.post(`/process`, paymentDetails);
  console.log(response);
  return response.data;
};

export const fetchTransactionDetails = async (transactionId: string) => {
  // const port = process.env.GATEWAY_PORT;
  const response = await axiosInstance.get(`/transaction/${transactionId}`);
  return response.data;
};
