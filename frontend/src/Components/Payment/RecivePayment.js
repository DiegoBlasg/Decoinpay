import React, { useContext, useState } from "react"
import { useParams } from "react-router-dom";
import QRCode from 'react-qr-code';
import UserContext from "../../Context/User/UserContext";
import axios from "axios";

export default function RecivePayment() {
    const txnhash = useParams().txnhash;
    const { selectedUser } = useContext(UserContext);
    const [valuePrice, setValuePrice] = useState("")
    const [value, setValue] = useState()
    const [isPayed, setIsPayed] = useState(false)

    const getPriceOfValue = async () => {
        const res = await axios.get('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd')
        setValuePrice(res.data.binancecoin.usd * value);
    }
    const getTransaction = async () => {
        const res = await axios.get("/api/transactions/admin/" + txnhash)
        setValue(res.data.valueInBNB)
    }
    const CheckIsPayed = async () => {
        const res = await axios.get("/api/transactions/admin/" + txnhash)
        res.data.ispaid ? setIsPayed(true) : setIsPayed(false)
    }
    React.useEffect(() => {
        getTransaction()
        getPriceOfValue()
    }, [selectedUser])

    return (
        <div className="container pt-3 bg-dark my-3 p-3 rounded shadow-lg">
            <div className="row shadow mb-4 bg-dark rounded p-3 mx-2 mt-2">
                <img src="/img/logoblanco3.png" className="mx-auto" style={{ width: "150px" }} alt="logo" />
            </div>
            <h4 className='text-center text-warning'>IMPORTANTE<i className="bi bi-exclamation-triangle-fill mx-2"></i></h4>
            <h5 className='text-center text-warning m-3'>LAS DOS WALLET TIENE QUE SER DE LA BINANCE SMART CHAIN <a target="_blank" href='https://academy.binance.com/es/articles/connecting-metamask-to-binance-smart-chain' style={{ textDecoration: "none", cursor: "pointer" }} className='text-primary'>Como hacerlo</a></h5>

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
            {
                isPayed ?
                    <div className="text-center shadow mb-4 bg-success rounded p-3 mx-2 text-center">
                        <h4 className='text-center text-dark'>PAGO COMPLETADO<i className="bi bi-check-square-fill mx-2"></i></h4>
                    </div>
                    :
                    <div className="text-center shadow mb-4 bg-danger rounded p-3 mx-2 text-center">
                        <h4 className='text-center text-dark'>NO HA SIDO PAGADO<i className="bi bi-x-octagon-fill mx-2"></i></h4>
                    </div>
            }
            <div className="text-center shadow mb-4 bg-dark rounded p-3 mx-2 text-center">
                <button className="btn btn-primary my-2 fs-5 py-2" onClick={() => CheckIsPayed()}>Comprobar pago</button>
            </div>
        </div>
    )
}