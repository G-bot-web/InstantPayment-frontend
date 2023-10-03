import React, { Component } from 'react';
import { ToastContainer, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toaster.css'
export default class Toaster extends Component {
  render() {
    return (
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss
        draggable pauseOnHover transition={Flip}
      />
    );
  }
}
