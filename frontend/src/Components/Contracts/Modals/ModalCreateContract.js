import React, { useContext } from 'react';
import UserContext from '../../../Context/User/UserContext';
import useContract from "../Hooks/useContracts";
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

export default function ModalCreateContracts({ modalIsOpen, setIsOpen }) {
    const { selectedUser } = useContext(UserContext);
    const { setName, createContract } = useContract();

    const closeModal = () => {
        setIsOpen(false);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (selectedUser) {
            createContract();
        } else {
            alert("Conecta metamask para poder continuar")
        }
    }

    const onImputChange = (e) => {
        if (selectedUser) {
            setName(e.target.value)
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
                <h2 className='text-white text-center'>Crear contrato</h2>
                <hr className='text-white' />
                <div className="text-center mx-auto my-5">
                    <h3 className="text-white my-4">Nombre</h3>
                    <input type="text" className="border-primary bg-dark text-white my-2 w-75 text-center py-1" placeholder="Nombre del contrato" onChange={onImputChange} maxLength="65" required />
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary">Crear</button>
                </div>
            </form>
        </Modal>
    )
} 