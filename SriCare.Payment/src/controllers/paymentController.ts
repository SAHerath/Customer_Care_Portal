import { Request, Response } from "express";
import {
  initiatePayment,
  fetchTransactionDetails,
} from "../services/paymentGatewayService";

export const processPayment = async (req: Request, res: Response) => {
  try {
    console.log(req.body);
    const { amount, method, userId } = req.body;
    const transaction = await initiatePayment({ amount, method, userId });
    res.status(200).json({ status: "success", transaction });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      // Type narrowing for Error
      res.status(500).json({ status: "error", message: error.message });
    } else {
      res
        .status(500)
        .json({ status: "error", message: "An unexpected error occurred" });
    }
  }
};

export const getTransactionDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const transaction = await fetchTransactionDetails(id);
    res.status(200).json({ status: "success", transaction });
  } catch (error) {
    if (error instanceof Error) {
      // Type narrowing for Error
      res.status(500).json({ status: "error", message: error.message });
    } else {
      res
        .status(500)
        .json({ status: "error", message: "An unexpected error occurred" });
    }
  }
};
