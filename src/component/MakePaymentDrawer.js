import {
    Drawer,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@material-ui/core";
import PriceChangeIcon from '@mui/icons-material/PriceChange';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import LocalConvenienceStoreIcon from '@mui/icons-material/LocalConvenienceStore';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import MakeTransactionStepper from './MakeTransactionStepper';
import {
    InboxOutlined,
    ReceiptOutlined,
} from "@material-ui/icons";
import { useState } from "react";
import './MakePaymentDrawer.css'
import PastTransactionStepper from "./PastTransactionStepper";
import { useEffect } from "react";
const data = [
    {
        name: "Make Transaction",
        icon: <CurrencyExchangeIcon />,
    },
    { name: "Check Status", icon: <InboxOutlined /> },
    { name: "Pay Bills", icon: <PriceChangeIcon /> },
    { name: "UpComming Bills", icon: <AttachMoneyIcon /> },
    { name: "Past Transaction", icon: <LocalConvenienceStoreIcon /> },
    { name: "Trash", icon: <ReceiptOutlined /> },
];

function MakePaymentDrawer() {
    const [open, setOpen] = useState(false);
    const [activeTab, setactiveTab] = useState("Make Transaction");
    const [previousActiveTab, setpreviousActiveTab] = useState("0");
    useEffect(() => {
        const bodyElt = document.getElementById(previousActiveTab);
        bodyElt.style.background='lightgrey'
      }, [""])
    const handleChange = (event,id) => {
        if(previousActiveTab==id){
            const bodyElt = document.getElementById(id);
            bodyElt.style.background='lightgrey'
        }else{
            const bodyElt = document.getElementById(previousActiveTab);
            bodyElt.style.background='none'
            setpreviousActiveTab(id);
            const bodyElt1 = document.getElementById(id);
            bodyElt1.style.background='lightgrey'
        }
        setactiveTab(event);

      };
    const getList = () => (
        <div style={{ width: 250 }} onClick={() => setOpen(false)} >
            {data.map((item, index) => (
                <ListItem id={index} button key={index} onClick={() => handleChange(item.name,index)} >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.name} />
                </ListItem>
            ))}
        </div>
    );
    function renderSwitch(){
        switch(activeTab) {
          case 'Make Transaction':
            return (<div id="cardPaymentFreez" style={{marginLeft:'255px',marginTop:'50px',marginRight:'35px'}}><MakeTransactionStepper/> </div>);
            case 'Past Transaction':
                return (<div style={{marginLeft:'255px',marginTop:'50px',marginRight:'35px'}}><PastTransactionStepper/> </div>);    
            default:
            return (<></>);
        }
      };
    return (
        <div>
        <div>
            <Drawer
                variant="permanent"
                open={open}
                anchor={"left"}
                onClose={() => setOpen(false)}
                
            >
                {getList()}
            </Drawer>
            
        </div>
        {renderSwitch()}
        </div>
    );
}

export default MakePaymentDrawer;