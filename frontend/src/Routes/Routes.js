import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

import OnlinePaymentForm from '../Components/Payment/OnlinePaymentForm';
import Header from '../Components/Header';
import Account from '../Components/Account/Account';
import Prices from '../Components/Prices/Layout/Prices';

import Contracts from '../Components/Contracts/Layout/Contracts';
import ContractInfo from '../Components/Contracts/Layout/ContractInfo/ContractInfo';
import ContractsSettings from '../Components/Contracts/Layout/ContractsSettings';

import UserState from '../Context/User/UserState';
import CoinInfo from '../Components/CoinInfo';
import RecivePayment from '../Components/Payment/RecivePayment';
import DoPayment from '../Components/Payment/DoPayment';
import Api from '../Components/Api/Api';
import OnlyDevPage from '../Components/ONLYDEVPAGE';


function Routes() {
    const [phone, setPhone] = useState(true)
    const isAPhone = () => {
        if (window.innerWidth < 768) {
            setPhone(true);
        } else {
            setPhone(false);
        }
    }

    window.addEventListener('resize', isAPhone)

    React.useEffect(() => {
        isAPhone();
    }, []);
    return (
        <UserState>
            <BrowserRouter>
                <Header isPhone={phone} />
                <Switch>
                    <Route path="/account">
                        <Account isPhone={phone} />
                    </Route>

                    <Route path="/info/:id">
                        <ContractInfo isPhone={phone} />
                    </Route>

                    <Route path="/ajustes/:id">
                        <ContractsSettings isPhone={phone} />
                    </Route>

                    <Route path="/contracts">
                        <Contracts isPhone={phone} />
                    </Route>

                    <Route path="/coininfo/:id">
                        <CoinInfo isPhone={phone} />
                    </Route>

                    <Route path="/pay/:transactionid">
                        <OnlinePaymentForm />
                    </Route>

                    <Route path="/recivepayment/:txnhash">
                        <RecivePayment />
                    </Route>

                    <Route path="/dopayment/:txnhash">
                        <DoPayment />
                    </Route>

                    <Route path="/api">
                        <Api isPhone={phone} />
                    </Route>
                    <Route path="/onlydevpage">
                        <OnlyDevPage isPhone={phone} />
                    </Route>

                    <Route path="/">
                        <Prices isPhone={phone} />
                    </Route>

                </Switch>
            </BrowserRouter>
        </UserState>
    );
}

export default Routes;
