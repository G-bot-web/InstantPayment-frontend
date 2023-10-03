import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import TextField from '@material-ui/core/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import StepLabel from '@mui/material/StepLabel';
import { useTheme } from '@mui/material/styles';
import './MakeTransactionStepper.css';
import { postTransaction } from '../redux/ApiCalls';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Card from 'react-credit-cards'
import 'react-credit-cards/es/styles-compiled.css'
import Checkbox from '@mui/material/Checkbox';
import ConfettiExplosion from 'react-confetti-explosion';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import PreLoader from './PreLoader'

const steps = ['Basic Details', 'Choose Payment Type', 'Transfer Details', 'Final Status'];

export default function MakeTransactionStepper() {
  const [activeStep, setActiveStep] = useState(0);
  const mystate = useSelector((state) => state.InstantPaymentReducer);
  const transactionData = {
    name: '', email: '', phone: '',
    CardAccount: { CardType: "", ExpirationYear: "", ExpirationMonth: "", SecurityCode: "", CardAccountNumber: "", Amount: "" },
    DDAccount: { AccountNumber: "", RTN: "", AccountType: "", Amount: "", SecurityCode: "" },
    CoinTransfer: { AccountNumber: "", CoinType: "", Amount: "", SecurityCode: "" },
    TransactionType: "",
  }
  const names = [
    'Card Transfer',
    'DDA Transfer',
    'Coin Transfer'
  ];


  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 250,
      },
    },
  };
  const [personName, setPersonName] = React.useState([]);
  const [done, setDone] = useState(undefined);
  function getStyles(name, personName, theme) {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  }
  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      value
    );
    setinputlist({
      ...inputlist,
      ["TransactionType"]: value
    });
  };
  const theme = useTheme();
  const dispatch = useDispatch();

  const [inputlist, setinputlist] = useState(transactionData)
  useEffect(() => {

  }, [""])


  const handleNext = () => {
    var noOfErrors = ''
    Object.entries(errors).forEach(([key, val]) => {
      noOfErrors += val
    })

    if (activeStep === 3) {
      dispatch(postTransaction(inputlist));
      const bodyElt1 = document.getElementById("cardPaymentFreez");
      bodyElt1.style.background='lavender'
      bodyElt1.style.cursor='wait'
      setTimeout(() => {
        bodyElt1.style.background='none'
        bodyElt1.style.cursor='default'
        noOfErrors === '' ? setActiveStep((prevActiveStep) => prevActiveStep + 1) : setActiveStep(activeStep)
    }, 3000);
      
    }
    else{
      noOfErrors === '' ? setActiveStep((prevActiveStep) => prevActiveStep + 1) : setActiveStep(activeStep)
    }
    
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };


  const handleReset = () => {
    setActiveStep(0);
    setinputlist({
      ...inputlist, CardAccount: {}, name: "", email: "", phone: ""
    });
  };
  const handleSubmit = (e) => {
    const { name, value } = e.target;

    if (["ExpirationYear", "ExpirationMonth", "CardAccountNumber", "CardType", "Amount", "SecurityCode"].includes(e.target.name)) {
      const { name, value } = e.target;

      const list = { ...inputlist.CardAccount };
      list[name] = value;
      setinputlist({
        ...inputlist, CardAccount: list
      });
    } else {
      validate(name, value)
      setinputlist({
        ...inputlist,
        [name]: value
      });
    }

  }

  const [errors, seterrors] = useState({});
  function validate(name, value) {
    if (name === 'phone') {
      let reg = new RegExp(/^(\+\d{2,3}[- ]?)?\d{10}$/).test(value)
      if (!reg) {
        seterrors({ ...errors, phone: 'In valid phone number' })
      }
      else {
        seterrors({ ...errors, phone: '' })
      }
    }
    if (name === 'email') {
      let reg = new RegExp(/^[^\s@]+@[^\s@]+$/).test(value)
      if (!reg) {
        seterrors({ ...errors, email: 'Enter valid email' })
      }
      else {
        seterrors({ ...errors, email: '' })
      }
    }
  }
  function getStepContent(step) {
    switch (step) {
      case 0:
        return (
          <>
            <div >
              <span >Enter Your Name: </span>
              <TextField style={{ verticalAlign: '0px', marginLeft: '10px', marginBottom: '20px', width: '300px' }} label="Enter your name" name='name' value={inputlist.name} onChange={handleSubmit} />
            </div>

            <div>
              <span>Email: </span>
              <TextField style={{ verticalAlign: '0px', marginLeft: '112px', marginBottom: '20px', width: '300px' }} error={Boolean(errors.email)} helperText={errors.email} label="Email" name='email' value={inputlist.email} onChange={handleSubmit} />
            </div>

            <div>
              <span> Phone Number: </span>
              <TextField style={{ verticalAlign: '0px', marginLeft: '28px', marginBottom: '10px', width: '300px' }} error={Boolean(errors.phone)} helperText={errors.phone} label="Phone" name='phone' value={inputlist.phone} onChange={handleSubmit} />
            </div>
          </>
        );
      case 1:
        return (
          <>
            <Typography variant="subtitle1" style={{ marginLeft: '50px' }}>
              Select the Type of transaction
            </Typography>
            <FormControl sx={{ m: 1, width: 300, mt: 3 }}>
              <Select
                multiple
                displayEmpty
                value={personName}
                onChange={handleChange}
                input={<OutlinedInput />}
                renderValue={(selected) => {
                  if (selected.length === 0) {
                    return <em>Transaction Type</em>;
                  }
                  return selected;
                }}
                MenuProps={MenuProps}
                
              >
                <MenuItem disabled >
                  <em>Available Transfer</em>
                </MenuItem>
                {names.map((name) => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, personName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        );
      case 2:
        return (<>
          {inputlist.TransactionType == "Card Transfer" ?
            <div style={{ marginLeft: '-90px' }}>
              <div >
                <span >Enter CardAccountNumber: </span>
                <TextField style={{ verticalAlign: '0px', marginLeft: '53px', marginBottom: '10px', width: '300px' }} label="Enter your CardAccountNumber" name='CardAccountNumber' value={inputlist.CardAccount.CardAccountNumber} onChange={handleSubmit} />
              </div>

              <div>
                <span>CardType: </span>
                <TextField style={{ verticalAlign: '0px', marginLeft: '209px', marginBottom: '10px', width: '300px' }} error={Boolean(errors.CardType)} helperText={errors.CardType} label="CardType" name='CardType' value={inputlist.CardAccount.CardType} onChange={handleSubmit} />
              </div>

              <div>
                <span> Expiration Year: </span>
                <TextField style={{ verticalAlign: '0px', marginLeft: '161px', marginBottom: '5px', width: '100px' }} error={Boolean(errors.ExpirationYear)} helperText={errors.ExpirationYear} label="YYYY" name='ExpirationYear' value={inputlist.CardAccount.ExpirationYear} onChange={handleSubmit} />
              </div>
              <div>
                <span>Expiration Month: </span>
                <TextField style={{ verticalAlign: '0px', marginLeft: '141px', marginBottom: '5px', width: '100px' }} error={Boolean(errors.ExpirationMonth)} helperText={errors.ExpirationMonth} label="MM" name='ExpirationMonth' value={inputlist.CardAccount.ExpirationMonth} onChange={handleSubmit} />
              </div>
              <div>
                <span>Amount: </span>
                <TextField style={{ verticalAlign: '0px', marginLeft: '222px', marginBottom: '10px', width: '300px' }} error={Boolean(errors.Amount)} helperText={errors.Amount} label="Amount" name='Amount' value={inputlist.CardAccount.Amount} onChange={handleSubmit} />
              </div>
              <div>
                <span>SecurityCode(CVV): </span>
                <TextField style={{ verticalAlign: '0px', marginLeft: '130px', marginBottom: '10px', width: '300px' }} error={Boolean(errors.SecurityCode)} helperText={errors.SecurityCode} label="SecurityCode" name='SecurityCode' value={inputlist.CardAccount.SecurityCode} onChange={handleSubmit} />
              </div>
            </div>
            : inputlist.TransactionType == "DDA Transfer" ?
              <></>
              :
              <></>}</>
        );
      case 3:
        return (<div id='cardPaymentFreez'><span >Please Confirm the Details Before Proceding</span>
          <div style={{ marginLeft: '-300px', marginTop: '20px' }}>
            <Card
              number={inputlist.CardAccount.CardAccountNumber}
              name={inputlist.name}
              expiry={inputlist.CardAccount.ExpirationYear + '/' + inputlist.CardAccount.ExpirationMonth}
              cvc={inputlist.CardAccount.CardAccountNumber}
              focused="VISA"
            />
          </div>
          <div style={{ marginLeft: '0px', marginTop: '20px' }}><Checkbox defaultChecked /><span >Proceed with Transfer of Amount $ {inputlist.CardAccount.Amount}</span></div>
        </div>
        );
      default:
        return "unknown step";
    }
  }
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeStep === steps.length ? (
        <React.Fragment>
          <div style={{ marginTop: '25px' }}>{mystate.IsExploding &&
            <ConfettiExplosion {...{
              force: 0.8,
              duration: 3000,
              particleCount: 250,
              width: 1600
            }} />}
            <TableContainer component={Paper}>
              <div style={{
                margin: '15px',
                marginTop: '20px',
                fontStyle: 'italic',
                fontKerning: 'unset'
              }}>Transaction Status: {mystate.lastTransactionResponse.Status}</div>
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
                  <TableRow
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {mystate.lastTransactionResponse.MessageId}
                    </TableCell>
                    <TableCell align="right">{mystate.lastTransaction.CardAccount.CardAccountNumber}</TableCell>
                    <TableCell align="right">{mystate.lastTransaction.CardAccount.Amount}</TableCell>
                    <TableCell align="right">{mystate.lastTransactionResponse.Status}</TableCell>
                    <TableCell align="right">{mystate.lastTransactionResponse.TransactionID}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className='stepform'>{getStepContent(activeStep, inputlist)}</div>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button

              disabled={activeStep === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
              style={{ marginLeft: '45px' }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />


            <Button onClick={handleNext} style={{ marginRight: '45px' }}>
              {activeStep === steps.length - 1 ? 'Pay' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
