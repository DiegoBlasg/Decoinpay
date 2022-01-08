import React, { useContext } from 'react';
import UserContext from '../../../Context/User/UserContext';
import useContract from "../Hooks/useContracts";

export default function CreateContracts() {
    const { selectedUser } = useContext(UserContext);
    const { setName, createContract } = useContract();

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
        <div className="container bg-dark my-5 p-3 pb-4 rounded shadow-lg">
            <form onSubmit={onSubmit}>
                <div className="text-center w-50  mx-auto mt-2 mb-4">
                    <h3 className="text-white my-2">Nombre</h3>
                    <input type="text" className="w-50 border-primary bg-dark text-white my-2" placeholder="Nombre del contrato" onChange={onImputChange} required />
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary w-25">Crear</button>
                </div>
            </form>
        </div>
    )
} 