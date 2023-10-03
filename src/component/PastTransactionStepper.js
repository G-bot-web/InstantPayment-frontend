import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './MakeTransactionStepper.css';
import 'react-credit-cards/es/styles-compiled.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import { getPastTransaction } from '../redux/ApiCalls';
function PastTransactionStepper() {
    const mystate = useSelector((state) => state.InstantPaymentReducer);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getPastTransaction({'email':JSON.parse(localStorage.getItem('userstatus')).email}));
    }, [""])
    return (
        <div><TableContainer component={Paper}>
            <div style={{
                margin: '15px',
                marginTop: '10px',
                textAlign: 'center',
                color: 'rgb(0, 0, 0)',
                backgroundColor: 'rgb(255, 255, 255)',
                border: '1px solid transparent',
                boxShadow: '0 4px 2px -2px rgba(0, 0, 0, 0.2)'

            }}>Transaction History</div>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Message ID/Token</TableCell>
                        <TableCell align="right">AccountNumber</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell align="right">Status</TableCell>
                        <TableCell align="right">TransactionID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {mystate.transactionList.map((row) => (
                        <TableRow
                            key={row.messageID}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {row.messageID}
                            </TableCell>
                            <TableCell align="right">{row.transferAccountNbr}</TableCell>
                            <TableCell align="right">{row.amount}</TableCell>
                            {row.response === "Success" ? <TableCell align="right" ><span id="SpanGreen">{row.response}</span></TableCell> : <TableCell align="right" ><span id="SpanRed">{row.response}</span></TableCell>}
                            <TableCell align="right">{row.transactionID}</TableCell>
                        </TableRow>))}
                </TableBody>
            </Table>
        </TableContainer></div>
    )
}

export default PastTransactionStepper