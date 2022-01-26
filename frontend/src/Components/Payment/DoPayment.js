import React, { useContext, useState } from "react"
import UserContext from "../../Context/User/UserContext";
import axios from "axios";

import { ethers } from 'ethers';
import { useParams } from "react-router-dom";


export default function DoPayment() {
    const txnhash = useParams().txnhash;

    const { selectedUser, encryptText } = useContext(UserContext);

    const [wallet, setWallet] = useState("");
    const [valuePrice, setValuePrice] = useState("")
    const [contract_id, setContract_id] = useState(null)
    const [amount, setAmount] = useState(null)

    const getWallet = async () => {
        if (selectedUser) {
            const axiosConfig = {
                headers: {
                    "wallet": encryptText(process.env.REACT_APP_ADMIN_PASSWORD || "9876")
                }
            };
            const res = await axios.get('/api/contracts/admin/contractinfo/' + contract_id, axiosConfig)
            setWallet(res.data)
        }
    }

    const getValuePrice = async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd')
        setValuePrice(res.data.binancecoin.usd * amount);
    }
    const onSubmit = async () => {
        if (selectedUser) {
            try {
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                await provider.send("eth_requestAccounts", [])
                const signer = provider.getSigner();
                const tx = await signer.sendTransaction({
                    to: wallet,
                    value: ethers.utils.parseEther(amount)
                })
                const recibo = await provider.getTransactionReceipt(tx.hash)
                const value = tx.value._hex.substring(2)
                const value2 = ethers.utils.formatEther(parseInt(value, 16).toString())

                const fee = recibo.gasUsed._hex.substring(2)
                const fee2 = ethers.utils.formatEther(parseInt(fee, 16).toString())

                const newDate = new Date()

                const currentdate = `${newDate.getFullYear()}-${newDate.getMonth() < 10 ? `0${newDate.getMonth() + 1}` : `${newDate.getMonth() + 1}`}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`

                const transaction = {
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
                        "wallet": selectedUser.wallet_id
                    }
                };
                await axios.put('/api/users/transactions', transaction, axiosConfig)

                await axios.put('/api/contracts/transactions/' + contract_id, transaction, { headers: { "wallet": encryptText(process.env.REACT_APP_ADMIN_PASSWORD || "9876") } })
                const updateOTransaction = {
                    transactionHash: tx.hash
                }
                await axios.put("/api/transactions/" + txnhash, updateOTransaction, axiosConfig)

            } catch (error) {
                console.log(error);
                alert("Algo ha salido mal")
            }
            window.location.href = "/account"

        } else {
            alert("Conecta metamask para poder continuar")
        }

    }
    const getTransaction = async () => {
        const res = await axios.get("/api/transactions/admin/" + txnhash)
        setAmount(res.data.valueInBNB)
        setContract_id(res.data.contract_id)
        if (contract_id) {
            getWallet()
            getValuePrice()
        }
    }
    React.useEffect(() => {
        if (selectedUser) {
            getTransaction()
        }
    }, [selectedUser])
    React.useEffect(() => {
        if (contract_id) {
            getWallet()
            getValuePrice()
        }
    }, [contract_id])

    return (
        <div className="container pt-3 bg-dark my-3 p-3 rounded shadow-lg">
            <div className="row shadow mb-4 bg-dark rounded p-3 mx-2 mt-2">
                <img src="/img/logoblanco3.png" className="mx-auto" style={{ width: "150px" }} alt="logo" />
            </div>
            <h5 className='text-center text-warning'>Warning<i className="bi bi-exclamation-triangle-fill mx-2"></i></h5>
            <h5 className='text-center text-warning m-3'>Asegurate de que estais en la blockchain de Binance Smart Chain, podrias perder el dinero sino.</h5>


            <div className="row shadow mb-4 bg-dark rounded p-3 mx-2 text-center">
                <div>
                    <h4 className="text-white">Total: </h4>
                </div>
                <div>
                    <h2 className="text-white">{amount} BNB</h2>
                    <h4 className="text-success">{valuePrice} $</h4>
                </div>
            </div>
            <div className="text-center shadow mb-4 bg-dark rounded p-3 mx-2 text-center">
                <button className="btn btn-primary my-2" onClick={onSubmit}>Pagar</button>
            </div>
        </div>
    )
}