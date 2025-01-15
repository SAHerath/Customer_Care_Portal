import React, { useEffect, useState } from "react";
import { 
  Box,
  Typography,
  Paper,
  Button,
  CircularProgress,
} from "@mui/material";
import { getRequest } from "../services/authService";

interface CurrentBill {
  userId: string;
  billId: string;
  amount: number;
  dueDate: string;
  status: string;
}

const CurrentBill: React.FC = () => {
  const [bill, setBill] = useState<CurrentBill | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
  
    const fetchData = async () => {
      try {
        const response = await getRequest("billing/current-bill");
        if (response) {
          setBill(response.data);
          // console.log(response.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
    setLoading(false);
  }, []);

  const handlePayBill = () => {
    if (bill) {
      alert(`Paying bill: ${bill.billId}, Amount: ₹${bill.amount.toFixed(2)}`);
      // Logic for bill payment
    }
  };
  

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
    <Paper elevation={3} sx={{ padding: 4, textAlign: 'center', }}>
      <Typography variant="h6">Bill ID: {bill?.billId}</Typography>
      <Typography variant="body1">Amount: Rs.{bill?.amount.toFixed(2)}</Typography>
      <Typography variant="body1">
        Due Date: {new Date(bill? bill.dueDate : '').toLocaleDateString()}
      </Typography>
      <Typography variant="body1">Status: {bill?.status}</Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
        onClick={handlePayBill}
      >
        Pay Bill
      </Button>
    </Paper>
  );
};

export default CurrentBill;