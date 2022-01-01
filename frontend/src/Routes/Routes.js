import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Contracts from '../Components/Contracts/ContractsMain/Contracts';
import OnlinePaymentForm from '../Components/Forms/OnlinePaymentForm';
import Header from '../Components/Header';
import Account from '../Components/Account';
import Prices from '../Components/Prices/Prices';
import ContractInfo from '../Components/Contracts/ContractInfo/ContractInfo';
import ContractsSettings from '../Components/Contracts/ContractsSettings';
import CreateContract from '../Components/Contracts/CreateContract';
import ModifyContract from '../Components/Contracts/ModifyContract';
import CreateAllowed_user from '../Components/Contracts/Allowed_users/CreateAllowed_user';
import ModifyAllowed_user from '../Components/Contracts/Allowed_users/ModifyAllowed_user';
import AddToken from '../Components/Prices/AddToken';
import UserState from '../Context/User/UserState';
import PrivateRoute from './PrivateRoute';
import NotUserSelected from '../Errors/NotUserSelected';

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

                    <PrivateRoute path="/AddToken/:id">
                        <AddToken />
                    </PrivateRoute>

                    <PrivateRoute path="/ModifyAllowedUser/:id/:idau">
                        <ModifyAllowed_user />
                    </PrivateRoute>

                    <PrivateRoute path="/ModifyContract/:id">
                        <ModifyContract />
                    </PrivateRoute>

                    <PrivateRoute path="/createAllowedUser/:id">
                        <CreateAllowed_user />
                    </PrivateRoute>

                    <PrivateRoute path="/createContract">
                        <CreateContract />
                    </PrivateRoute>

                    <PrivateRoute path="/contracts">
                        <Contracts isPhone={phone} />
                    </PrivateRoute >

                    <PrivateRoute path="/account">
                        <Account isPhone={phone} />
                    </PrivateRoute >

                    <PrivateRoute path="/info/:id">
                        <ContractInfo isPhone={phone} />
                    </PrivateRoute >

                    <PrivateRoute path="/ajustes/:id">
                        <ContractsSettings isPhone={phone} />
                    </PrivateRoute >


                    <Route path="/notUser">
                        <NotUserSelected />
                    </Route>
                    <Route path="/pay">
                        <OnlinePaymentForm />
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
