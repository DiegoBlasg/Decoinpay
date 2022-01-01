import axios from "axios";
import React, { useState } from "react";
import { useContext } from "react";
import UserContext from "../../Context/User/UserContext";

export default function AddToken() {
    const [contract, setContract] = useState("")
    const { selectedUser } = useContext(UserContext);

    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.get(`https://api.pancakeswap.info/api/v2/tokens/${contract}`)

        } catch (error) {
            alert("No se ha encontrado ningun token con ese contrato")
            return;
        }

        const NewToken = {
            token_contract: contract
        }
        await axios.put('http://localhost:4000/users/othertoken/' + selectedUser._id, NewToken)

        window.location.href = '/'


    }
    const onImputChange = (e) => {
        setContract(e.target.value)
    }
    return (
        <div className="container bg-dark my-5 p-3 pb-4 rounded shadow-lg">
            <form onSubmit={onSubmit}>
                <div className="text-center w-50  mx-auto mt-2 mb-4">
                    <h3 className="text-white my-2">Contrato</h3>
                    <input type="text" className="w-50 border-primary bg-dark text-white my-2" placeholder="Nombre del contrato" onChange={onImputChange} required />
                </div>
                <div className="text-center mt-4">
                    <button className="btn btn-primary w-25">Crear</button>
                </div>
            </form>
        </div>
    )
}