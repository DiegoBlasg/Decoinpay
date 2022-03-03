import axios from "axios";
import { ethers } from "ethers";
import React, { useContext, useState } from "react"
import QRCode from 'react-qr-code';
import { useParams } from "react-router-dom";
import UserContext from "../../Context/User/UserContext";

export default function OnlinePaymentForm() {

    const hash = useParams().transactionid;
    const { encryptText } = useContext(UserContext);

    const [transaction, setTransaction] = useState({});
    const [valuePrice, setValuePrice] = useState("")

    const getPriceOfValue = async (value) => {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd')
        setValuePrice(res.data.binancecoin.usd * value);
    }

    const onSubmit = async (event) => {
        event.preventDefault()
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
        const signer = provider.getSigner();
        const walletAdress = await signer.getAddress()
        const tx = await signer.sendTransaction({
            to: walletAdress,
            value: ethers.utils.parseEther(transaction.valueInBNB)
        })


        const recibo = await provider.getTransactionReceipt(tx.hash)
        const value = tx.value._hex.substring(2)
        const value2 = ethers.utils.formatEther(parseInt(value, 16).toString())

        const fee = recibo.gasUsed._hex.substring(2)
        const fee2 = ethers.utils.formatEther(parseInt(fee, 16).toString())

        const newDate = new Date()

        const currentdate = `${newDate.getFullYear()}-${newDate.getMonth() < 10 ? `0${newDate.getMonth() + 1}` : `${newDate.getMonth() + 1}`}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`


        const newtransaction = {
            txnHash: tx.hash,
            block: recibo.blockNumber,
            dateTime: currentdate,
            from: recibo.from.toLowerCase(),
            to: recibo.to.toLowerCase(),
            value: value2,
            txnFee: fee2
        }

        const axiosConfig = {
            headers: {
                "wallet": encryptText(walletAdress.toLowerCase())
            }
        };
        await axios.put(`${process.env.REACT_APP_API_URL}/users/transactions`, newtransaction, axiosConfig)

        await axios.put(`${process.env.REACT_APP_API_URL}/contracts/transactions/` + transaction.contract_id, newtransaction, { headers: { "wallet": encryptText(process.env.REACT_APP_ADMIN_PASSWORD) } })

        const updateOTransaction = {
            transactionHash: tx.hash
        }
        await axios.put(`${process.env.REACT_APP_API_URL}/transactions/` + hash, updateOTransaction, axiosConfig)

        window.location.href = transaction.return_url
    }

    const getTransaction = async () => {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/transactions/` + hash)
        setTransaction(res.data)
        getPriceOfValue(res.data.valueInBNB)
    }

    React.useEffect(() => {
        getTransaction()
    }, [])

    return (

        <div className="container pt-3 bg-dark my-3 p-3 rounded shadow-lg">
            <div className="row shadow mb-4 bg-dark rounded p-3 mx-2 mt-2">
                <img src="/img/logoblanco3.png" className="mx-auto" style={{ width: "150px" }} alt="logo" />
            </div>
            <h4 className='text-center text-warning'>IMPORTANTE<i className="bi bi-exclamation-triangle-fill mx-2"></i></h4>
            <h5 className='text-center text-warning m-3'>LAS DOS WALLET TIENE QUE SER DE LA BINANCE SMART CHAIN <a target="_blank" href='https://academy.binance.com/es/articles/connecting-metamask-to-binance-smart-chain' style={{ textDecoration: "none", cursor: "pointer" }} className='text-primary'>Como hacerlo</a></h5>

            <div className="row shadow mb-4 bg-dark rounded p-3 mx-2">
                <div className="d-flex justify-content-center">
                    <span className="bg-dark border border-3 border-white text-white">
                        <QRCode value={`https://decoinpay.com/dopayment/${hash}`} />
                    </span >
                </div >
            </div >

            <div className="row shadow mb-4 bg-dark rounded p-3 mx-2 text-center">
                <div>
                    <h4 className="text-white">Total: </h4>
                </div>
                <div>
                    <h2 className="text-white">{transaction.valueInBNB} BNB</h2>
                    <h4 className="text-success">{valuePrice}$</h4>
                </div>
            </div>
            <div className="text-center shadow mb-4 bg-dark rounded p-3 mx-2">
                <button className="btn btn-primary my-2 mx-4" onClick={() => window.location.href = transaction.cancel_url}>Cancelar</button>
                <button className="btn btn-primary my-2 mx-4" onClick={onSubmit}>Pagar</button>
            </div>
        </div >

    )
}