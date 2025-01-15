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

interface PastBill {
  billId: string;
  amount: number;
  dueDate: string;
  paidDate: string;
  status: string;
}

const PastBills: React.FC = () => {
  const [bills, setBills] = useState<PastBill[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
  
    const fetchData = async () => {
      try {
        const response = await getRequest("billing/past-bills");
        if (response) {
          setBills(response.data.pastBills);
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
            <TableCell>Bill ID</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Due Date</TableCell>
            <TableCell>Paid Date</TableCell>
            <TableCell>Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bills.map((bill) => (
            <TableRow key={bill.billId}>
              <TableCell>{bill.billId}</TableCell>
              <TableCell>₹{bill.amount.toFixed(2)}</TableCell>
              <TableCell>{new Date(bill.dueDate).toLocaleDateString()}</TableCell>
              <TableCell>{new Date(bill.paidDate).toLocaleDateString()}</TableCell>
              <TableCell>{bill.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default PastBills;