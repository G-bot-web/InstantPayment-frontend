import React from 'react'
import './Home.css'
import { loading } from '../redux/actions/InstantPaymentActions';
import PreLoader from './PreLoader';
import { useSelector } from 'react-redux';
import NavBar from './NavBar';
import MakePaymentDrawer from './MakePaymentDrawer';
import Toaster from './toaster'
export default function Home() {
    const mystate = useSelector((state) => state.InstantPaymentReducer);
  return (
    mystate.loading?<PreLoader/>: <div >
        < NavBar/>
        <Toaster/>
        <MakePaymentDrawer/>
        </div>
  )
}
