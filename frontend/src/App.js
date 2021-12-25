import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Contracts from './Components/Contracts/ContractsMain/Contracts';
import OnlinePaymentForm from './Components/Forms/OnlinePaymentForm';
import Header from './Components/Header';
import Account from './Components/Account';
import Prices from './Components/Prices/Prices';
import ContractInfo from './Components/Contracts/ContractInfo/ContractInfo';
import ContractsSettings from './Components/Contracts/ContractsSettings';
import CreateContract from './Components/Contracts/CreateContract';
import ModifyContract from './Components/Contracts/ModifyContract';
import CreateAllowed_user from './Components/Contracts/Allowed_users/CreateAllowed_user';
import ModifyAllowed_user from './Components/Contracts/Allowed_users/ModifyAllowed_user';

function App() {
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
    <BrowserRouter>
      <Header isPhone={phone} />
      <Switch>
        <Route path="/pay">
          <OnlinePaymentForm />
        </Route>
        <Route path="/ModifyAllowedUser/:id/:idau">
          <ModifyAllowed_user />
        </Route>
        <Route path="/ModifyContract/:id">
          <ModifyContract />
        </Route>
        <Route path="/createAllowedUser/:id">
          <CreateAllowed_user />
        </Route>
        <Route path="/createContract">
          <CreateContract />
        </Route>
        <Route path="/contracts">
          <Contracts isPhone={phone} />
        </Route >
        <Route path="/account">
          <Account isPhone={phone} />
        </Route >
        <Route path="/info/:id">
          <ContractInfo isPhone={phone} />
        </Route >
        <Route path="/ajustes/:id">
          <ContractsSettings isPhone={phone} />
        </Route >
        <Route path="/">
          <Prices isPhone={phone} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
