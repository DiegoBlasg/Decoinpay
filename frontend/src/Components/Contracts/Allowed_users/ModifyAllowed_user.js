import React from 'react';
import { useParams } from 'react-router-dom';
import useAllowed_users from "./useAllowed_users";

export default function ModifyAllowed_user() {
    const contract_id = useParams().id;
    const allowedUser_id = useParams().idau;
    const { alias, wallet_id, setAlias, setWallet_id, getAllowed_users, updateAllowed_user } = useAllowed_users(contract_id, allowedUser_id);

    const onSubmit = async (event) => {
        event.preventDefault();
        updateAllowed_user();
        window.location.href = '/ajustes/' + contract_id

    }

    const onImputChangeAlias = (e) => {
        setAlias(e.target.value)
    }
    const onImputChangeWallet = (e) => {
        setWallet_id(e.target.value)
    }

    React.useEffect(() => {
        getAllowed_users();
    }, [])
    return (
        <div className="container bg-dark my-5 p-3 pb-4 rounded shadow-lg">
            <div className="text-center w-50  mx-auto mt-2 mb-4">
                <h3 className="text-white my-2">Nombre</h3>
                <input type="text" value={alias} className="w-50 border-primary bg-dark text-white my-2" placeholder="Nombre del contrato" onChange={onImputChangeAlias} />
            </div>
            <div className="text-center w-50  mx-auto mt-2 mb-4">
                <h3 className="text-white my-2">Wallet</h3>
                <input value={wallet_id} type="text" className="w-50 border-primary bg-dark text-white my-2" placeholder="Nombre del contrato" onChange={onImputChangeWallet} />
            </div>
            <div className="text-center mt-4">
                <form onSubmit={onSubmit}>
                    <button className="btn btn-primary w-25">Modificar</button>
                </form>
            </div>
        </div>
    )
} 