import { ethers } from 'ethers';
import React, { useContext, useState } from 'react';
import UserContext from '../../../Context/User/UserContext'
import Modal from 'react-modal';
import axios from 'axios';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '30%',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        backgroundColor: '#212529',
        border: '0',
    },
    overlay: {
        backgroundColor: 'rgba(100, 100, 100, 0.75)'
    }
};

Modal.setAppElement('#root');

export default function ModalMakeTransaction({ modalIsOpen, setIsOpen, getUserTransactions, getBalance }) {
    const { selectedUser, encryptText } = useContext(UserContext);
    const [amount, setAmount] = useState("");
    const [wallet, setWallet] = useState("");

    const closeModal = () => {
        setIsOpen(false);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
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

                const axiosConfigTxnFrom = {
                    headers: {
                        "wallet": selectedUser.wallet_id
                    }
                };
                const axiosConfigTxnTo = {
                    headers: {
                        "wallet": encryptText(recibo.to.toLowerCase())
                    }
                };
                await axios.put(`${process.env.REACT_APP_API_URL}/users/transactions`, transaction, axiosConfigTxnFrom)
                await axios.put(`${process.env.REACT_APP_API_URL}/users/transactions`, transaction, axiosConfigTxnTo)
                getUserTransactions()
                getBalance()
            } catch (error) {
                alert("Algo ha salido mal")
            }

        } else {
            alert("Conecta metamask para poder continuar")
        }

    }
    const onImputChangeAmount = (e) => {
        if (selectedUser) {
            setAmount(e.target.value)
        }
    }
    const onImputChangeWallet = (e) => {
        if (selectedUser) {
            setWallet(e.target.value)
        }
    }
    return (

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            closeTimeoutMS={200}
        >
            <form onSubmit={(event) => { onSubmit(event); closeModal() }}>
                <div className='d-flex justify-content-end'><i className="bi bi-x-circle-fill text-primary fs-4" onClick={closeModal}></i></div>
                <hr className='text-white' />
                <h2 className='text-white text-center'>Realizar transaccion</h2>
                <hr className='text-white' />
                <h4 className='text-center text-warning'>IMPORTANTE<i className="bi bi-exclamation-triangle-fill mx-2"></i></h4>
                <h5 className='text-center text-warning my-3'>LAS DOS WALLET TIENE QUE SER DE LA BINANCE SMART CHAIN <a target="_blank" href='https://academy.binance.com/es/articles/connecting-metamask-to-binance-smart-chain' style={{ textDecoration: "none", cursor: "pointer" }} className='text-primary'>Como hacerlo</a></h5>
                <div className="text-center mx-auto mt-2 mb-4">
                    <h3 className="text-white my-2">Enviar a:</h3>
                    <input type="text" className="w-50 border-primary bg-dark text-white my-2" placeholder="Wallet" required onChange={onImputChangeWallet} maxLength="65" required />
                </div>
                <div className="text-center mx-auto mt-2 mb-4">
                    <h3 className="text-white my-2">Importe</h3>
                    <input type="number" step="any" className="w-50 border-primary bg-dark text-white my-2" placeholder="importe en BNB" required onChange={onImputChangeAmount} required />
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary">Enviar</button>
                </div>
            </form>
        </Modal>
    )
} 