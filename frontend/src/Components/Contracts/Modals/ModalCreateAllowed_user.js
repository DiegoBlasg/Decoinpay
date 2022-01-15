import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useAllowed_users from "../Hooks/useAllowed_users";
import UserContext from '../../../Context/User/UserContext'
import Modal from 'react-modal';

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

export default function ModalCreateAllowed_user({ modalIsOpen, setIsOpen }) {
    const contract_id = useParams().id;
    const { selectedUser } = useContext(UserContext);
    const { setAlias, setWallet, createAllowed_user } = useAllowed_users(contract_id);

    const closeModal = () => {
        setIsOpen(false);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (selectedUser) {
            createAllowed_user();
        } else {
            alert("Conecta metamask para poder continuar")
        }

    }
    const onImputChangeAlias = (e) => {
        if (selectedUser) {
            setAlias(e.target.value)
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
                <h2 className='text-white text-center'>Añadir usuario permitido</h2>
                <hr className='text-white' />
                <div className="text-center mx-auto mt-2 mb-4">
                    <h3 className="text-white my-2">Alias</h3>
                    <input type="text" className="border-primary bg-dark text-white my-2" placeholder="Nombre del contrato" required onChange={onImputChangeAlias} maxLength="65" required />
                </div>
                <div className="text-center mx-auto mt-2 mb-4">
                    <h3 className="text-white my-2">Wallet</h3>
                    <input type="text" className=" border-primary bg-dark text-white my-2" placeholder="Nombre del contrato" required onChange={onImputChangeWallet} required />
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary">Añadir</button>
                </div>
            </form>
        </Modal>
    )
} 