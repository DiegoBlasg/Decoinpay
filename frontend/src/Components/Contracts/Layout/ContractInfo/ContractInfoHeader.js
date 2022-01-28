import { useState } from "react";
import { Link } from "react-router-dom";
import ModalReceiveTransaction from "../../Modals/ModalReceiveTransaction";

export default function ContractInfoHeader(props) {

    const [modalReceiveTransactionIsOpen, setModalReceiveTransactionIsOpen] = useState(false)

    const info = props.BasicInfoContract;
    const contractID = "0x" + info._id;
    const shortID = contractID.substring(0, 5) + "..." + contractID.substring(contractID.length - 4, contractID.length)

    const openModalReceiveTransaction = () => {
        setModalReceiveTransactionIsOpen(true)
    }

    return (
        <>
            {
                props.isPhone ?
                    <>
                        <div className="row">
                            <div className="col col-2 text-primary d-flex align-items-center">
                                <Link to={"/contracts"}><i className="bi bi-arrow-left-square-fill text-white fs-1"></i></Link>
                            </div>
                            <div className="col col-8">
                                <h3 className="text-white text-center">{info.name}</h3>
                                <h5 className="text-white text-center">{shortID}</h5>
                            </div>
                            <div className="col col-2 text-primary fs-1 d-flex align-items-center">
                                {
                                    props.isOwner ?
                                        <Link to={"/ajustes/" + info._id}><i className="bi bi-gear"></i></Link>
                                        :
                                        <></>
                                }
                            </div>
                        </div>
                        <div className="row pt-3 px-5 text-primary fs-1 text-center" style={{ cursor: "pointer" }} onClick={() => openModalReceiveTransaction()}>
                            <i className="bi bi-box-arrow-in-down-right"></i>
                            <h5>Recibir pago</h5>
                        </div>
                    </>
                    :
                    <>
                        <div className="row mx-3">
                            <div className="col col-2 text-primary">
                                <Link to={"/contracts"}><i className="bi bi-arrow-left-square-fill text-white fs-1"></i></Link>
                            </div>
                            <div className="col col-8">
                                <h3 className="text-white text-center">{info.name}</h3>
                                <h5 className="text-white text-center">{"0x" + info._id}</h5>
                            </div>
                            <div className="col col-2 text-primary fs-1">
                                {
                                    props.isOwner ?
                                        <Link to={"/ajustes/" + info._id}><i className="bi bi-gear"></i></Link>
                                        :
                                        <></>
                                }
                            </div>
                        </div>

                        <div className="row pt-3 px-5 text-primary fs-1 text-center" style={{ cursor: "pointer" }} onClick={() => openModalReceiveTransaction()}>
                            <i className="bi bi-box-arrow-in-down-right"></i>
                            <h5>Recibir pago</h5>
                        </div>
                    </>
            }
            <ModalReceiveTransaction modalIsOpen={modalReceiveTransactionIsOpen} setIsOpen={setModalReceiveTransactionIsOpen} contractid={props.BasicInfoContract._id} />
        </>
    )
}