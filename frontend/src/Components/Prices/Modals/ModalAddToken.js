import React from "react";
import { useContext } from "react";
import UserContext from "../../../Context/User/UserContext";
import usePrices from "../Hooks/usePrices";
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

export default function ModalAddToken({ modalIsOpen, setIsOpen }) {
    const { setSpecificCoin, newAdded_token } = usePrices();
    const { selectedUser } = useContext(UserContext);

    const closeModal = () => {
        setIsOpen(false);
    }

    const onSubmit = async (event) => {
        event.preventDefault();
        if (selectedUser) {
            newAdded_token()
        } else {
            alert("Conecta metamask")
        }
    }
    const onImputChange = (e) => {
        if (selectedUser) {
            setSpecificCoin(e.target.value)
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
            <form onSubmit={(e) => { onSubmit(e); closeModal() }}>
                <div className='d-flex justify-content-end'><i className="bi bi-x-circle-fill text-primary fs-4" onClick={closeModal}></i></div>
                <hr className='text-white' />
                <h2 className='text-white text-center'>Añadir token</h2>
                <hr className='text-white' />
                <div className="text-center w-50  mx-auto mt-2 mb-4">
                    <h3 className="text-white my-2">Contrato</h3>
                    <input type="text" className="w-50 border-primary bg-dark text-white my-2" placeholder="Nombre del contrato" onChange={onImputChange} required />
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary w-25">Crear</button>
                </div>
            </form>
        </Modal>
    )
}