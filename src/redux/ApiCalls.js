import { updateStatus, getTransactions, updateIsExploding, AuthUser,loading } from "./actions/InstantPaymentActions"
import { ishistory } from "../history";
import { toast } from 'react-toastify';
const axios = require('axios');

const api = 'http://localhost:8080'

export const getAuth = (props) => {
    return function (dispatch) {
        axios.post(api+'/auth',props)
            .then(response => {
                if (response.status === 200) {
                    var apiresponse = response.data;
                    dispatch(AuthUser(apiresponse));
                    dispatch(loading(true));
                    if(apiresponse.AuthenticationStatus==="Authorized"){
                        localStorage.setItem('userstatus',JSON.stringify({
                            login:true,
                            password:props.password,
                            email:apiresponse.email,
                            logo:apiresponse.avatar
                        }))
                        toast.success('Login Success!');
                        ishistory.push('/home');
                        setTimeout(() => {
                            dispatch(loading(false))
                        }, 2000);
                    }else{
                        toast.dark('Unauthorized User!');
                    }

                }
            })
            .catch(error => {
                console.warn(error)
                toast.dark('Error while Authentication');
            })
    }
}

export const getPastTransaction = (prop) => {
    return function (dispatch) {
        axios.post(api+'/getTransection',prop)
            .then(response => {
                if (response.status === 200) {
                    var apiresponse = response.data;
                    dispatch(getTransactions(apiresponse));
                }
            })
            .catch(error => {
                console.warn(error)
                toast.dark('Error While Getting Transactions');
            })
    }
}

export const postTransaction = (prop) => {
    const newProp={'timeStamp':Date.now(),'apiVersion':'2','addressLine':'YashWant Nagar 411014','merchantName':'Google Pay','debitorDetails':[{'email':JSON.parse(localStorage.getItem('userstatus')).email,'password':JSON.parse(localStorage.getItem('userstatus')).password}],'transactionInfo':[{'currencyCode':'USD','TransactionType':'Credit','Amount':prop.CardAccount.Amount}],'creditorDetails':[{...prop.CardAccount,'AccountNumber':prop.CardAccount.CardAccountNumber,'RTN':'876562650','TypeCode':'DDA','Acctype':'CardAccount'}]};
    return function (dispatch) {
        axios.post(api+'/MakePayment/Credit',newProp)
            .then(response => {
                if (response.status === 200) {
                    var apiresponse = response.data;
                    dispatch(updateStatus(prop, apiresponse));
                    dispatch(updateIsExploding())
                }
            })
            .catch(error => {
                console.warn(error)
                toast.dark('Error While Getting Transactions');
            })
    }
}