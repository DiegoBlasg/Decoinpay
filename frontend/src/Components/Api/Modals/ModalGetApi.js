import React, { useContext, useState } from 'react';
import UserContext from '../../../Context/User/UserContext'
import Modal from 'react-modal';
import useContract from '../../Contracts/Hooks/useContracts';
import CryptoJs from "crypto-js"

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

export default function ModalGetApi({ modalIsOpen, setIsOpen }) {
    const { selectedUser } = useContext(UserContext);
    const { contracts, getContracts } = useContract();
    const [sowApiKey, setSowApiKey] = useState({ sow: false, id: "" });

    const closeModal = () => {
        setIsOpen(false);
    }
    const decryptAdminText = (text) => {
        const bytes = CryptoJs.AES.decrypt(text, process.env.REACT_APP_ADMIN_PASSWORD.toString())
        const textoDescifrado = bytes.toString(CryptoJs.enc.Utf8)
        return textoDescifrado.toLowerCase()
    }
    const sowApiKeyConditionally = (contractid) => {
        if (sowApiKey.id == contractid) {
            setSowApiKey({ sow: !sowApiKey.sow, id: contractid })
        } else {
            setSowApiKey({ sow: true, id: contractid })
        }
    }
    React.useEffect(() => {
        if (selectedUser) {
            getContracts();
        }
    }, [selectedUser, modalIsOpen])
    return (

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            closeTimeoutMS={200}
        >
            <form onSubmit={(event) => { closeModal() }}>
                <div className='d-flex justify-content-end'><i className="bi bi-x-circle-fill text-primary fs-4" onClick={closeModal}></i></div>
                <hr className='text-white' />
                <h2 className='text-white text-center'>Elige el contrato</h2>
                <hr className='text-white' />
                <div className="overflow-auto" style={{ maxHeight: "460px" }}>
                    {
                        contracts.map(contract => (
                            <div key={contract._id} >
                                <div className="text-center shadow mb-4 bg-dark rounded p-3 mx-2" onClick={() => sowApiKeyConditionally(contract._id)}>
                                    <div className="card bg-primary shadow-lg" style={{ cursor: "pointer" }} >
                                        <div className="card-body">
                                            <blockquote className="blockquote mb-0">
                                                <h4 className="text-white py-2">{contract.name}</h4>
                                                <footer className="blockquote-footer text-light py-2">{("0x" + contract._id).substring(0, 4) + "..." + ("0x" + contract._id).substring(("0x" + contract._id).length - 4, ("0x" + contract._id).length)}</footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                </div>
                                <>
                                    {
                                        sowApiKey.sow && sowApiKey.id == contract._id ?
                                            <div className="text-center text-white shadow mb-5 bg-dark rounded p-3 mx-2">
                                                <h5><font className="text-primary">contractid:</font> {contract._id}</h5>
                                                <h5><font className="text-primary">api_key:</font> {decryptAdminText(contract.api_key)}</h5>
                                            </div>
                                            :
                                            <></>
                                    }
                                </>
                            </div>
                        ))
                    }
                </div>

            </form>
        </Modal >
    )
} 