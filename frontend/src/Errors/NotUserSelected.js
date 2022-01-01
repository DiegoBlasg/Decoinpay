import axios from "axios";
import React, { useContext } from "react";
import UserContext from "../Context/User/UserContext";

export default function NotUserSelected() {
    const { getUsers, getProfile, users, selectedUser } = useContext(UserContext);

    //dev only
    const createUser = async () => {
        const newUser = {
            wallet_id: "0x0000",
            business_user: false
        }
        await axios.post('http://localhost:4000/users', newUser)
        getUsers()
    }

    React.useEffect(() => {
        getUsers()
    }, [])
    return (
        <div className="container pt-5 bg-dark my-5 p-5 rounded shadow-lg d-flex justify-content-center">
            <div className="card w-75 bg-dark border-0">
                <div className="card-header my-3 bg-danger rounded">
                    <h1 className="text-white text-center">ERROR</h1>
                </div>
                <div className="card-body my-3 bg-warning">
                    <h3 className="text-dark text-center">Selecciona alguno en la parte superior derecha</h3>
                </div>
                <div className="card-body my-3 bg-dark d-flex  justify-content-center">
                    <button className="btn btn-primary" onClick={() => createUser()}>crear usuario</button>
                </div>
            </div>

        </div>
    )
}