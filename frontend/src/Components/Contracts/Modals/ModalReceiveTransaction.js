import React, { useContext, useState } from 'react';
import UserContext from '../../../Context/User/UserContext';
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


export default function ModalReceiveTransaction({ modalIsOpen, setIsOpen, contractid }) {

    const { selectedUser } = useContext(UserContext);
    const [value, setValue] = useState()

    const cambiardolarvalor = async (num) => {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd')
        document.getElementById("USD").value = num * res.data.binancecoin.usd
        setValue(document.getElementById("BNB").value)
    }
    const cambiarcoinvalor = async (num) => {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd')
        document.getElementById("BNB").value = num / res.data.binancecoin.usd
        setValue(document.getElementById("BNB").value)
    }
    const closeModal = () => {
        setIsOpen(false);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (selectedUser) {
            const axiosConfig = {
                headers: {
                    "wallet": selectedUser.wallet_id
                }
            };
            const newTransaction = {
                valueInBNB: value
            }
            const res = await axios.post("http://localhost:4000/transactions/admin/" + contractid, newTransaction, axiosConfig)
            console.log(res);
            window.location.href = "/receivepayment/" + res.data.hash
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
            <form onSubmit={onSubmit}>
                <div className='d-flex justify-content-end'><i className="bi bi-x-circle-fill text-primary fs-4" onClick={closeModal}></i></div>
                <hr className='text-white' />
                <h2 className='text-white text-center'>Recibir pago</h2>
                <hr className='text-white' />
                <div className="text-center mx-auto mt-2 mb-4">
                    <h3 className="text-white my-2">Importe en BNB</h3>
                    <input id='BNB' type="number" step="any" className="w-50 border-primary bg-dark text-white my-2" placeholder="Importe" onKeyUp={(e) => cambiardolarvalor(e.target.value)} maxLength="19" required />

                    <h3 className="text-white my-2">Importe en USD</h3>
                    <input id='USD' type="number" step="any" className="w-50 border-primary bg-dark text-white my-2" placeholder="Importe" onKeyUp={(e) => cambiarcoinvalor(e.target.value)} maxLength="19" />

                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary">Siguiente</button>
                </div>
            </form>
        </Modal>
    )
} 