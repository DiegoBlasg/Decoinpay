import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../../Context/User/UserContext';
import useAllowed_users from "../Hooks/useAllowed_users";
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


export default function ModalModifyAllowed_user({ modalIsOpen, setIsOpen, idAllowedUser }) {
    const contract_id = useParams().id;
    const allowedUser_id = idAllowedUser;
    const { selectedUser } = useContext(UserContext);
    const { alias, setAlias, getOneAllowed_user, updateAllowed_user } = useAllowed_users(contract_id, allowedUser_id);

    const closeModal = () => {
        setIsOpen(false);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (selectedUser) {
            updateAllowed_user();
            closeModal()
        }
    }

    const onImputChangeAlias = (e) => {
        if (selectedUser) {
            setAlias(e.target.value)
        }
    }

    React.useEffect(() => {
        getOneAllowed_user();
    }, [modalIsOpen])
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            closeTimeoutMS={200}
        >
            <form onSubmit={onSubmit}>
                <div className='d-flex justify-content-end'><i className="bi bi-x-circle-fill text-primary fs-4" onClick={closeModal}></i></div>
                <hr className='text-white' />
                <h2 className='text-white text-center'>Modificar usuario permitido</h2>
                <hr className='text-white' />
                <div className="text-center mx-auto mt-2 mb-4">
                    <h3 className="text-white my-2">Nombre</h3>
                    <input type="text" value={alias} className="w-50 border-primary bg-dark text-white my-2" placeholder="Nombre del contrato" onChange={onImputChangeAlias} maxLength="65" required />
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary">Modificar</button>
                </div>
            </form>
        </Modal>
    )
} 