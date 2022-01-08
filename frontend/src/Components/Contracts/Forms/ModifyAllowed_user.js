import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../../../Context/User/UserContext';
import useAllowed_users from "../Hooks/useAllowed_users";

export default function ModifyAllowed_user() {
    const contract_id = useParams().id;
    const allowedUser_id = useParams().idau;
    const { selectedUser } = useContext(UserContext);
    const { alias, wallet_id, setAlias, setWallet_id, getOneAllowed_user, updateAllowed_user } = useAllowed_users(contract_id, allowedUser_id);

    const onSubmit = async (event) => {
        event.preventDefault();
        if (selectedUser) {
            updateAllowed_user();
        }
    }

    const onImputChangeAlias = (e) => {
        if (selectedUser) {
            setAlias(e.target.value)
        }
    }

    React.useEffect(() => {
        getOneAllowed_user();
    }, [])
    return (
        <div className="container bg-dark my-5 p-3 pb-4 rounded shadow-lg">
            <form onSubmit={onSubmit}>
                <div className="text-center w-50  mx-auto mt-2 mb-4">
                    <h3 className="text-white my-2">Nombre</h3>
                    <input type="text" value={alias} className="w-50 border-primary bg-dark text-white my-2" placeholder="Nombre del contrato" onChange={onImputChangeAlias} required />
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary w-25">Modificar</button>
                </div>
            </form>
        </div>
    )
} 