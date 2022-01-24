import React, { useContext, useState } from "react"
import { useParams } from "react-router-dom";
import QRCode from 'react-qr-code';
import UserContext from "../../Context/User/UserContext";
import axios from "axios";

export default function Pay() {
    const txnhash = useParams().txnhash;
    const { selectedUser } = useContext(UserContext);
    const [valuePrice, setValuePrice] = useState("")
    const [value, setValue] = useState()

    const getPriceOfValue = async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd')
        setValuePrice(res.data.binancecoin.usd * value);
    }

    getPriceOfValue()
    const getTransaction = async () => {
        const res = await axios.get("/api/transactions/admin/" + txnhash)
        setValue(res.data.valueInBNB)
    }

    React.useEffect(() => {
        getTransaction()
    }, [selectedUser])

    return (
        <div className="container pt-3 bg-dark my-3 p-3 rounded shadow-lg">
            <div className="row shadow mb-4 bg-dark rounded p-3 mx-2 mt-2">
                <img src="/img/logoblanco3.png" className="mx-auto" style={{ width: "150px" }} alt="logo" />
            </div>
            <h5 className='text-center text-warning'>Warning<i className="bi bi-exclamation-triangle-fill mx-2"></i></h5>
            <h5 className='text-center text-warning m-3'>Asegurate de que estais en la blockchain de Binance Smart Chain, podrias perder el dinero sino.</h5>

            <div className="row shadow mb-4 bg-dark rounded p-3 mx-2 text-white">
                <div className="d-flex justify-content-center">
                    <span className="bg-dark border border-5 border-white">
                        {
                            selectedUser ?

                                <QRCode value={`https://decoinpay.com/dopayment/${txnhash}`} />
                                :
                                <></>
                        }
                    </span>
                </div>

                <h5 className="text-center my-3">{`https://decoinpay.com/dopayment/${txnhash}`}</h5>
            </div>

            <div className="row shadow mb-4 bg-dark rounded p-3 mx-2 text-center">
                <div>
                    <h4 className="text-white">Total: </h4>
                </div>
                <div>
                    <h2 className="text-white">{value} BNB</h2>
                    <h4 className="text-success">{valuePrice} $</h4>
                </div>
            </div>
        </div>
    )
}