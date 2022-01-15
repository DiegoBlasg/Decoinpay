import { ethers } from 'ethers';
import React, { useContext, useState } from 'react';
import UserContext from '../Context/User/UserContext';
import useUsers from './Hooks/useUsers'

export default function Account(props) {

  const { selectedUser, decryptText } = useContext(UserContext);

  const { getUserTransactions, transactions } = useUsers();
  const [balance, setBalance] = useState()

  React.useEffect(() => {
    getUserTransactions()

    if (selectedUser) {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      provider.getBalance(decryptText(selectedUser.wallet_id)).then((balance) => {
        const balanceInEth = ethers.utils.formatEther(balance)
        setBalance(balanceInEth)
      })
    }

  }, [selectedUser])
  return (
    <div className="container bg-dark my-5 p-5 pt-4 rounded shadow-lg">
      {props.isPhone ?
        <>
          <div className="row d-flex justify-content-center">
            <span className="border border-warning text-warning mx-2 p-2 w-auto" style={{ whiteSpace: "nowrap" }}>Balance: {balance} ETH</span>
          </div>
          <div className="row pt-4 d-flex justify-content-center">
            <h3 className="text-white text-center mx-2">TRASANCCIONES</h3>
          </div>

          <div className="row text-primary fs-2 text-center" style={{ cursor: "pointer" }}>
            <i className="bi bi-arrow-up-right"></i>
            <h5>Enviar pago</h5>
          </div>
        </>
        :
        <>
          <div className="row pt-4">
            <div className="col col-2  d-flex align-items-center justify-content-center">
              <span className="border border-warning text-warning p-2" style={{ whiteSpace: "nowrap" }}>Balance: {balance} ETH</span>
            </div>
            <div className="col col-8 d-flex align-items-center justify-content-center">
              <h3 className="text-white">TRASANCCIONES</h3>
            </div>
            <div className="col col-2 text-primary fs-2 text-center" style={{ cursor: "pointer" }}>
              <i className="bi bi-arrow-up-right"></i>
              <h5>Enviar pago</h5>
            </div>
          </div>
        </>
      }

      <div className="row pb-5 pt-4">
        <form className="d-flex">
          <input className="form-control me-2" style={{ height: "35px" }} type="search" placeholder="Search" aria-label="Search" />
        </form>
      </div>
      <div className="row">
        <div className="table-responsive">
          <table className="table table-dark table-striped">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Txn Hash</th>
                <th scope="col">Block</th>
                <th scope="col">Age</th>
                <th scope="col">From</th>
                <th scope="col">To</th>
                <th scope="col">Value</th>
                <th scope="col">[Txn Fee]</th>
              </tr>
            </thead>
            <tbody>
              {
                transactions.map(transaction => (
                  <tr>
                    <th scope="row"><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">{transaction.hash}</a></th>
                    <td style={{ whiteSpace: "nowrap" }}><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">{transaction.block}</a></td>
                    <td style={{ whiteSpace: "nowrap" }}>{transaction.age}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{transaction.from}</td>
                    <td style={{ whiteSpace: "nowrap" }}><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info"><i className="bi bi-file-earmark-text text-info"></i> {transaction.to}</a></td>
                    <td style={{ whiteSpace: "nowrap" }}>{transaction.value}</td>
                    <td style={{ whiteSpace: "nowrap" }}>{transaction.txn_fee}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}