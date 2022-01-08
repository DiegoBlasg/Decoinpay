import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import useAllowed_users from "../Hooks/useAllowed_users";
import UserContext from '../../../Context/User/UserContext'

export default function CreateAllowed_user() {
    const contract_id = useParams().id;
    const { selectedUser } = useContext(UserContext);
    const { setAlias, setWallet, createAllowed_user } = useAllowed_users(contract_id);

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
        <div className="container bg-dark my-5 p-3 pb-4 rounded shadow-lg">
            <form onSubmit={onSubmit}>
                <div className="text-center w-50  mx-auto mt-2 mb-4">
                    <h3 className="text-white my-2">Alias</h3>
                    <input type="text" className="w-50 border-primary bg-dark text-white my-2" placeholder="Nombre del contrato" required onChange={onImputChangeAlias} required />
                </div>
                <div className="text-center w-50  mx-auto mt-2 mb-4">
                    <h3 className="text-white my-2">Wallet</h3>
                    <input type="text" className="w-50 border-primary bg-dark text-white my-2" placeholder="Nombre del contrato" required onChange={onImputChangeWallet} required />
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary w-25">Añadir</button>
                </div>
            </form>
        </div>
    )
} 