import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import UserContext from "../../../Context/User/UserContext";
import useContract from "../Hooks/useContracts";
import ModalAreYouSure from "../Modals/Errors/ModalAreYouSure";
import ModalCreateAllowed_user from "../Modals/ModalCreateAllowed_user";
import ModalModifyAllowed_user from "../Modals/ModalModifyAllowed_user";
import ModalModifyContract from "../Modals/ModalModifyContract";

export default function ContractsSettings(props) {
    const contract_id = useParams().id;
    const { selectedUser } = useContext(UserContext);
    const { contracts, allowed_users, getOneContract, deleteAllowed_user } = useContract(contract_id);
    const [search, setSearch] = useState("");

    const [modalModifyCotrnactIsOpen, setModalModifyCotrnactIsOpen] = useState(false);
    const [modalCreateAllowedUserIsOpen, setModalCreateAllowedUserIsOpen] = useState(false);
    const [modalModifyAllowedUserIsOpen, setModalModifyAllowedUserIsOpen] = useState(false);
    const [modalAreYouSure, setModalAreYouSure] = useState(false);
    const [modalAreYouSureInformation, setModalAreYouSureInformation] = useState([]);
    const [idAllowedUser, setIdAllowedUser] = useState("");

    const openModalModifyCotrnactIsOpen = () => {
        setModalModifyCotrnactIsOpen(true)
    }
    const openMmodalCreateAllowedUserIsOpen = () => {
        setModalCreateAllowedUserIsOpen(true)
    }
    const openModalModifyAllowedUserIsOpen = () => {
        setModalModifyAllowedUserIsOpen(true)
    }
    const openModalAreYouSure = () => {
        setModalAreYouSure(true)
    }
    const getShortID = () => {
        let contractID = contracts._id + "";
        return contractID.substring(0, 5) + "..." + contractID.substring(contractID.length - 4, contractID.length)
    }

    const getShortWallet = (wallet) => {
        return wallet.substring(0, 5) + "..." + wallet.substring(wallet.length - 4, wallet.length)
    }

    const filteredAllowed_users = allowed_users.filter((allowed_user) =>
        allowed_user.alias.toLowerCase().includes(search.toLowerCase()) ||
        allowed_user.wallet_id.toLowerCase().includes(search.toLowerCase())
    )

    React.useEffect(() => {
        getOneContract();
    }, [selectedUser,
        modalAreYouSure,
        modalModifyAllowedUserIsOpen,
        modalCreateAllowedUserIsOpen,
        modalModifyCotrnactIsOpen])
    return (

        <div className="container bg-dark my-5 p-5 pb-4 rounded shadow-lg">

            <div className="row pb-4">
                <div className="col col-2 d-flex align-items-center">
                    <Link to={"/info/" + contract_id}><i className="bi bi-arrow-left-square-fill text-white fs-1"></i></Link>
                </div>
                <div className="col col-8">
                    <h2 className="text-white text-center">{contracts.name}</h2>
                    <h5 className="text-light text-center">{props.isPhone ? getShortID() : contracts._id}</h5>

                </div>
                <div className="col col-2 d-flex align-items-center">
                    <i className="bi bi-pencil-square text-white fs-1" onClick={() => openModalModifyCotrnactIsOpen()}></i>
                </div>
            </div>
            <h3 className="text-primary text-center pb-3">Carteras Autorizadas: {allowed_users.length}</h3>
            <div className="row pb-4 pt-2">
                <form className="d-flex">
                    <input className="form-control me-2" style={{ height: "40px" }} onChange={e => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                </form>
                <div className="table-responsive">

                    <table className="table table-dark table-borderless mt-3">
                        <tbody>
                            {
                                filteredAllowed_users.map(allowed_user => (
                                    <tr style={{ height: "55px" }} key={allowed_user._id}>
                                        <th style={{ whiteSpace: "nowrap" }} className="text-center">{allowed_user.alias}</th>
                                        <td style={{ whiteSpace: "nowrap" }} className="text-center"><i className="bi bi-pencil-square text-primary fs-3" onClick={() => { openModalModifyAllowedUserIsOpen(); setIdAllowedUser(allowed_user._id) }} /></td>
                                        <td style={{ whiteSpace: "nowrap" }} className="text-center">{allowed_user.wallet_id}</td>
                                        <td style={{ whiteSpace: "nowrap" }} className="text-center" onClick={() => { openModalAreYouSure(); setModalAreYouSureInformation([allowed_user.alias, props.isPhone ? getShortWallet(allowed_user.wallet_id) : allowed_user.wallet_id, allowed_user._id, allowed_user.wallet_id]) }}><i className="bi bi bi-trash text-danger fs-3"></i></td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
                <div className="row pt-3 px-5 text-primary fs-3 text-center" style={{ cursor: "pointer" }} onClick={openMmodalCreateAllowedUserIsOpen}>
                    <i className="bi bi-plus-square"></i>
                    <h5>Añadir wallet</h5>
                </div>

                <ModalModifyContract modalIsOpen={modalModifyCotrnactIsOpen} setIsOpen={setModalModifyCotrnactIsOpen} />
                <ModalCreateAllowed_user modalIsOpen={modalCreateAllowedUserIsOpen} setIsOpen={setModalCreateAllowedUserIsOpen} />
                <ModalModifyAllowed_user modalIsOpen={modalModifyAllowedUserIsOpen} setIsOpen={setModalModifyAllowedUserIsOpen} idAllowedUser={idAllowedUser} />
                <ModalAreYouSure
                    modalIsOpen={modalAreYouSure}
                    setIsOpen={setModalAreYouSure}
                    information={modalAreYouSureInformation}
                    text="SEGURO QUE QUIERE ELIMINAR EL SIGUIENTE USUARIO PERMITIDO:"
                    functionWhenDelete={deleteAllowed_user} />
            </div>
        </div>
    )
}