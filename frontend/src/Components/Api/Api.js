import React, { useState } from "react"
import ModalGetApi from "./Modals/ModalGetApi"

export default function Api() {
    const [consultas, setConsultas] = useState(false)
    const [modelo, setModelo] = useState(false)
    const [get1, setGet1] = useState(false)
    const [get2, setGet2] = useState(false)
    const [post1, setPost1] = useState(false)
    const [direccionpago, setDireccionpago] = useState(false)
    const [modalGetApi, setModalGetApi] = useState(false)
    return (
        <div className="container bg-dark my-5 p-4 pt-4 rounded shadow-lg">

            <div className="text-center shadow mb-4 bg-dark rounded p-3 mx-2 text-center">
                <div className="d-flex justify-content-center my-4 text-white">
                    <h2>API para poder usar esta plataforma desde su pagina web</h2>
                </div>
                <div className="d-flex justify-content-center my-4">
                    <button className="btn btn-primary fs-3 mb-4" onClick={() => setModalGetApi(true)}>Utilizar la api</button>
                </div>
                <div className="d-flex justify-content-center my-4 mb-2 text-white">
                    <h4>www.localhost:4000/</h4>
                </div>
            </div>
            <div className="d-flex justify-content-center align-items-center shadow mb-4 bg-dark rounded p-3 mx-2 text-white" style={{ cursor: "pointer" }} onClick={() => setDireccionpago(!direccionpago)}>
                <h2>Direccion de pago</h2>
                <i className={`bi bi-caret-${direccionpago ? "up" : "down"}-fill mx-3 fs-3`}></i>
            </div>
            {
                direccionpago ?
                    <div className="shadow mb-4 bg-dark rounded p-3 text-center text-white py-4">
                        <h4>www.localhost:3000/pay/<font className="text-success ">has-de-la-transaccion</font></h4>
                    </div>
                    :
                    <></>
            }
            <div className="d-flex justify-content-center align-items-center shadow mb-4 bg-dark rounded p-3 mx-2 text-white" style={{ cursor: "pointer" }} onClick={() => setModelo(!modelo)}>
                <h2>Modelo de datos</h2>
                <i className={`bi bi-caret-${modelo ? "up" : "down"}-fill mx-3 fs-3`}></i>
            </div>
            {
                modelo ?
                    <div className="shadow mb-4 bg-dark rounded p-3 text-white text-start">
                        <div className="d-flex justify-content-center">
                            <div>
                                <h4>contract_id:
                                    <font className="text-success fs-4 mx-2">String</font>
                                </h4>
                                <h4>valueInBNB:
                                    <font className="text-success fs-5 mx-2">String</font>
                                    <font className="text-danger fs-5 mx-2">Require</font>
                                </h4>
                                <h4>ispaid:
                                    <font className="text-primary fs-5 mx-2">Boolean</font>
                                </h4>
                                <h4>transactionHash:
                                    <font className="text-success fs-5 mx-2">String</font>
                                </h4>
                                <h4>return_url:
                                    <font className="text-success fs-5 mx-2">String</font>
                                    <font className="text-danger fs-5 mx-2">Require</font>
                                </h4>
                                <h4>cancel_url:
                                    <font className="text-success fs-5 mx-2">String</font>
                                    <font className="text-danger fs-5 mx-2">Require</font>
                                </h4>
                            </div>
                        </div>
                    </div>
                    :
                    <></>
            }

            <div className="d-flex justify-content-center align-items-center shadow mb-4 bg-dark rounded p-3 mx-2 text-white" style={{ cursor: "pointer" }} onClick={() => setConsultas(!consultas)}>
                <h2>Consultas</h2>
                <i className={`bi bi-caret-${consultas ? "up" : "down"}-fill mx-3 fs-3`}></i>
            </div>
            {
                consultas ?
                    <>
                        <div className="d-flex justify-content-around align-items-center shadow mb-4 bg-dark rounded p-3 mx-5 text-white" style={{ cursor: "pointer" }} onClick={() => setGet1(!get1)}>
                            <span className="btn btn-primary mx-2">GET</span>
                            <div className="d-flex justify-content-center">
                                <h4 className="font-weight-bold">/transactions/:conractid</h4>
                                <p className="my-auto mx-3" style={{ fontSize: "14px" }}>Muestra todas las transaciones del contrato aunque no se hayan hecho</p>
                            </div>
                            <i className={`bi bi-caret-${get1 ? "up" : "down"}-fill mx-3 fs-3`}></i>
                        </div>
                        {
                            get1 ?
                                <div className="shadow mb-4 bg-dark rounded p-3 mx-5 text-white">
                                    <div className="card bg-dark border border-primary border-3 mx-3 rounded m-3 mx-auto" style={{ maxWidth: "25rem" }}>
                                        <div className="card-body text-center">
                                            <h3 className="card-title my-3 mt-0">Headers</h3>
                                            <h5 className="text-start my-1 my-3">contractid: <font className="text-success">String</font></h5>
                                            <h5 className="text-start my-1 my-3">api_key: <font className="text-success">String</font></h5>
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                        }

                        <div className="d-flex justify-content-around align-items-center shadow mb-4 bg-dark rounded p-3 mx-5 text-white" style={{ cursor: "pointer" }} onClick={() => setGet2(!get2)}>
                            <span className="btn btn-primary mx-2">GET</span>
                            <div className="d-flex justify-content-center">
                                <h4 className="font-weight-bold">/transactions/:conractid/:idtransaction</h4>
                                <p className="my-auto mx-3" style={{ fontSize: "14px" }}>Muestra la informacion de una transaccion</p>
                            </div>
                            <i className={`bi bi-caret-${get2 ? "up" : "down"}-fill mx-3 fs-3`}></i>
                        </div>

                        {
                            get2 ?
                                <div className="shadow mb-4 bg-dark rounded p-3 mx-5 text-white">
                                    <div className="card bg-dark border border-primary border-3 mx-3 rounded m-3 mx-auto" style={{ maxWidth: "25rem" }}>
                                        <div className="card-body text-center">
                                            <h3 className="card-title my-3 mt-0">Headers</h3>
                                            <h5 className="text-start my-1 my-3">contractid: <font className="text-success">String</font></h5>
                                            <h5 className="text-start my-1 my-3">api_key: <font className="text-success">String</font></h5>
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                        }
                        <div className="d-flex justify-content-around align-items-center shadow mb-4 bg-dark rounded p-3 mx-5 text-white" style={{ cursor: "pointer" }} onClick={() => setPost1(!post1)}>
                            <span className="btn btn-success mx-2">POST</span>
                            <div className="d-flex justify-content-center">
                                <h4 className="font-weight-bold">/transactions/:conractid</h4>
                                <p className="my-auto mx-3" style={{ fontSize: "14px" }}>Agraga una transaccion inicialmente con el ispaid en false</p>
                            </div>
                            <i className={`bi bi-caret-${post1 ? "up" : "down"}-fill mx-3 fs-3`}></i>
                        </div>
                        {
                            post1 ?
                                <div className="shadow mb-4 bg-dark rounded p-3 mx-5 text-white">
                                    <div className="card-group">
                                        <div className="card bg-dark border border-primary border-3 mx-3 rounded m-3">
                                            <div className="card-body text-center">
                                                <h3 className="card-title">JSON</h3>
                                                <h5 className="text-start my-1">valueInBNB: <font className="text-success">String</font></h5>
                                                <h5 className="text-start my-1">return_url: <font className="text-success">String</font></h5>
                                                <h5 className="text-start my-1">cancel_url: <font className="text-success">String</font></h5>
                                            </div>
                                        </div>
                                        <div className="card bg-dark border border-primary border-3 mx-3 rounded m-3">
                                            <div className="card-body text-center">
                                                <h3 className="card-title">Headers</h3>
                                                <h5 className="text-start my-1">contractid: <font className="text-success">String</font></h5>
                                                <h5 className="text-start my-1">api_key: <font className="text-success">String</font></h5>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                :
                                <></>
                        }

                    </>
                    :
                    <></>
            }
            <ModalGetApi modalIsOpen={modalGetApi} setIsOpen={setModalGetApi} />
        </div>
    )
}