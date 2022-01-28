import React from 'react';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: '10%',
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

export default function ModalAreYouSure({ modalIsOpen, setIsOpen, information, text, functionWhenDelete }) {

    const closeModal = () => {
        setIsOpen(false);
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            closeTimeoutMS={200}
        >
            <div className='d-flex justify-content-end'><i className="bi bi-x-circle-fill text-danger fs-4" onClick={closeModal}></i></div>
            <hr className='text-white' />
            <h2 className='text-danger text-center px-5'>{text}</h2>
            <h2 className='text-danger text-center px-5 pt-3'>{information[0]}</h2>
            <h2 className='text-danger text-center px-5 pt-3'>{information[1]}</h2>
            <hr className='text-white' />
            <div className="text-center mt-5 mb-3">
                <button className="btn btn-primary mx-5 mt-3" onClick={closeModal}>Cancelar</button>
                <button className="btn btn-danger mx-5 mt-3" onClick={() => { closeModal(); functionWhenDelete(information[2], information[3]) }}>Eliminar</button>
            </div>
        </Modal>
    );
}