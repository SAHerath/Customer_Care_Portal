import React, { useEffect, useState } from "react";
import { 
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { getRequest } from "../services/authService";

interface Payment {
  paymentId: string;
  billId: string;
  amount: number;
  paymentDate: string;
  method: string;
}

const PaymentHistory: React.FC = () => {
  const [bills, setBills] = useState<Payment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
  
    const fetchData = async () => {
      try {
        const response = await getRequest("billing/payment-history");
        if (response) {
          setBills(response.data.paymentsHistory);
          // console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
    setLoading(false);
  }, []);
  

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Payment ID</TableCell>
            <TableCell>Bill ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Payment Date</TableCell>
            <TableCell>Method</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bills.map((payment) => (
            <TableRow key={payment.paymentId}>
              <TableCell>{payment.paymentId}</TableCell>
              <TableCell>{payment.billId}</TableCell>
              <TableCell>Rs.{payment.amount.toFixed(2)}</TableCell>
              <TableCell>{new Date(payment.paymentDate).toLocaleDateString()}</TableCell>
              <TableCell>{payment.method}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PaymentHistory;