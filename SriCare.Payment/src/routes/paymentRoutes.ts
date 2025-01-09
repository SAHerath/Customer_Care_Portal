import { Router } from "express";
import {
  processPayment,
  getTransactionDetails,
} from "../controllers/paymentController";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     PaymentRequest:
 *       type: object
 *       properties:
 *         amount:
 *           type: number
 *           description: Amount to be paid
 *         method:
 *           type: string
 *           description: Payment method (e.g., creditCard, debitCard)
 *         userId:
 *           type: string
 *           description: ID of the user making the payment
 *       required:
 *         - amount
 *         - method
 *         - userId
 *     PaymentResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *         transaction:
 *           type: object
 *           description: Transaction details
 */

/**
 * @swagger
 * /process:
 *   post:
 *     summary: Process a payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PaymentRequest'
 *     responses:
 *       200:
 *         description: Payment processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaymentResponse'
 */
router.post("/process", processPayment);

/**
 * @swagger
 * /transaction/{id}:
 *   get:
 *     summary: Get transaction details
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Transaction ID
 *     responses:
 *       200:
 *         description: Transaction details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                 transaction:
 *                   type: object
 */
router.get("/transaction/:id", getTransactionDetails);

export default router;
