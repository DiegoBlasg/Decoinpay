import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import UserContext from '../../../../Context/User/UserContext';
import useContract from "../../Hooks/useContracts";
import ModalAreYouSure from '../../Modals/Errors/ModalAreYouSure';
import ModalCreateContracts from '../../Modals/ModalCreateContract';

export default function ContractsCreated({ isPhone, search, modalIsOpen, setIsOpen }) {

    const { selectedUser } = useContext(UserContext);
    const { contracts, getContracts, deleteContract } = useContract();

    const [modalAreYouSureIsOpen, setModalAreYouSureIsOpen] = useState(false);
    const [idContract, setIdContract] = useState("");

    const filteredContracts = contracts.filter((contract) =>
        contract.name.toLowerCase().includes(search.toLowerCase()) ||
        ("0x" + contract._id).toLowerCase().includes(search.toLowerCase())
    )
    const openModalAreYouSureIsOpen = (contractname, contractid, fullId) => {
        setModalAreYouSureIsOpen(true);
        setIdContract([contractname, contractid, fullId])
    }

    React.useEffect(() => {
        getContracts();
    }, [selectedUser, modalIsOpen])
    return (
        <div>
            {
                isPhone ?
                    filteredContracts.map(contract => (
                        <div className="container" key={contract._id}>
                            <div className="row py-2 px-4">
                                <Link to={"/info/" + contract._id} style={{ textDecoration: "none" }}>
                                    <div className="card bg-primary shadow-lg">
                                        <div className="card-body">
                                            <blockquote className="blockquote mb-0">
                                                <h4 className="text-white py-2">{contract.name}</h4>
                                                <footer className="blockquote-footer text-light py-2">{("0x" + contract._id).substring(0, 4) + "..." + ("0x" + contract._id).substring(("0x" + contract._id).length - 4, ("0x" + contract._id).length)}</footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="row px-4 pb-3">
                                <div>
                                    <div className="card bg-danger shadow-lg">
                                        <div className="card-body fs-1 text-center mt-2 text-dark py-0" onClick={() => openModalAreYouSureIsOpen(contract.name, ("0x" + contract._id).substring(0, 4) + "..." + ("0x" + contract._id).substring(("0x" + contract._id).length - 4, ("0x" + contract._id).length), contract._id)}>
                                            <i className="bi bi-trash-fill"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    filteredContracts.map(contract => (
                        < div className="row py-3 px-5" key={contract._id}>
                            <div className="col col-11">

                                <Link to={"/info/" + contract._id} style={{ textDecoration: "none" }}>
                                    <div className="card bg-primary shadow-lg">
                                        <div className="card-body">
                                            <blockquote className="blockquote mb-0">
                                                <h4 className="text-white py-2">{contract.name}</h4>
                                                <footer className="blockquote-footer text-light py-2">{"0x" + contract._id}</footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col col-1 text-dark d-flex align-items-center justify-content-center bg-danger rounded fs-1" onClick={() => openModalAreYouSureIsOpen(contract.name, ("0x" + contract._id), contract._id)} >
                                <i className="bi bi-trash-fill"></i>
                            </div>
                        </div >
                    ))
            }

            <ModalAreYouSure
                modalIsOpen={modalAreYouSureIsOpen}
                setIsOpen={setModalAreYouSureIsOpen}
                information={idContract}
                text="SEGURO QUE QUIERE ELIMINAR EL SIGUIENTE CONTRATO:"
                functionWhenDelete={deleteContract} />

            <ModalCreateContracts modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />
        </div>
    )
}