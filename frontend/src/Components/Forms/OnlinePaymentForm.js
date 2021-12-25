import React, { useState } from "react"

export default function OnlinePaymentForm() {
    const [showInfo, setShowInfo] = useState(false);
    const cambiarvalor = () => {
        setShowInfo(!showInfo)
    }
    return (
        <div className="container pt-3 bg-dark my-3 p-3 rounded shadow-lg">
            <div className="row shadow mb-4 bg-dark rounded p-3 mx-2 mt-2">
                <img src="/img/logoblanco3.png" className="mx-auto" style={{ width: "200px" }} alt="logo" />
            </div>
            <div className="row shadow mb-4 bg-dark rounded p-3 mx-2">
                <div className="input-group mx-auto" onClick={() => cambiarvalor()}>
                    <h4 className="text-white mx-auto">mostrar QR y wallet<i className="bi bi-arrow-down-square mx-3"></i></h4>
                </div>
            </div>
            {
                showInfo ?
                    <>
                        <div className="row shadow mb-4 bg-dark rounded p-3 mx-2">
                            <img src="/img/qrejemplo.png" className="mx-auto" style={{ width: "200px" }} alt="QR" />
                        </div>
                        <div className="row shadow mb-4 bg-dark rounded p-3 mx-2">
                            <div className="input-group mx-auto">
                                <h4 className="text-white mx-auto">0x9F8...c36b88<i className="bi bi-files mx-3"></i></h4>
                            </div>
                        </div>
                    </>
                    :
                    <></>
            }

            <div className="row shadow mb-4 bg-dark rounded p-3 mx-2 text-center">
                <div>
                    <h4 className="text-white">Total: </h4>
                </div>
                <div>
                    <img alt="CoinLogo" src="/img/3.png" style={{ width: "50px" }} className="p-2" />
                    <h2 className="text-white">0.0081 BNB</h2>
                    <h4 className="text-success">5.3 $</h4>
                </div>
            </div>
            <div className="text-center shadow mb-4 bg-dark rounded p-3 mx-2 mb-2">
                <img alt="CoinLogo" src="/img/1.png" style={{ width: "50px" }} className="p-2" />
                <img alt="CoinLogo" src="/img/2.png" style={{ width: "50px" }} className="p-2" />
                <img alt="CoinLogo" src="/img/3.png" style={{ width: "50px" }} className="p-2" />
                <img alt="CoinLogo" src="/img/1.png" style={{ width: "50px" }} className="p-2" />
                <img alt="CoinLogo" src="/img/2.png" style={{ width: "50px" }} className="p-2" />
                <img alt="CoinLogo" src="/img/3.png" style={{ width: "50px" }} className="p-2" />
                <img alt="CoinLogo" src="/img/1.png" style={{ width: "50px" }} className="p-2" />
                <img alt="CoinLogo" src="/img/2.png" style={{ width: "50px" }} className="p-2" />
                <img alt="CoinLogo" src="/img/3.png" style={{ width: "50px" }} className="p-2" />
            </div>
            <div className="text-center shadow mb-4 bg-dark rounded p-3 mx-2 mb-2">
                <button className="btn btn-primary">Pagar</button>
            </div>
        </div>
    )
}