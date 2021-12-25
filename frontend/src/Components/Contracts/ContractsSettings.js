import React from "react";
import { Link, useParams } from "react-router-dom";
import useContract from "./useContracts";

export default function ContractsSettings(props) {
    const contract_id = useParams().id;
    const { contracts, allowed_users, getOneContract, deleteAllowed_user } = useContract(contract_id);


    function getShortID() {
        let contractID = contracts.contract.contract_id + "";
        return contractID.substring(0, 5) + "..." + contractID.substring(contractID.length - 4, contractID.length)
    }

    React.useEffect(() => {
        getOneContract();
    }, [])
    return (

        <div className="container bg-dark my-5 p-5 pb-4 rounded shadow-lg">

            <div className="row pb-4">
                <div className="col col-2 d-flex align-items-center">
                    <Link to={"/info/" + contract_id}><i className="bi bi-arrow-left-square-fill text-white fs-1"></i></Link>
                </div>
                <div className="col col-8">
                    <h2 className="text-white text-center">{contracts.contract.name}</h2>
                    <h5 className="text-light text-center">{props.isPhone ? getShortID() : contracts.contract.contract_id}</h5>

                </div>
                <div className="col col-2">
                    <Link to={"/ModifyContract/" + contract_id}>
                        <i className="bi bi-pencil-square text-white fs-1"></i>
                    </Link>
                </div>
            </div>
            <h3 className="text-primary text-center pb-3">Carteras Autorizadas: {allowed_users.allowed_user.length}</h3>
            <div className="row pb-4 pt-2">
                <form className="d-flex">
                    <input className="form-control me-2" style={{ height: "40px" }} type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-primary text-white" type="submit">Search</button>
                </form>
                <div className="table-responsive">

                    <table className="table table-dark table-borderless mt-3">
                        <tbody>
                            {
                                allowed_users.allowed_user.map(allowed_user => (
                                    <tr style={{ height: "55px" }} key={allowed_user._id}>
                                        <th style={{ whiteSpace: "nowrap" }} className="text-center">{allowed_user.alias}</th>
                                        <td style={{ whiteSpace: "nowrap" }} className="text-center"><Link to={'/ModifyAllowedUser/' + contract_id + '/' + allowed_user._id}><i className="bi bi-pencil-square text-primary fs-3" /></Link></td>
                                        <td style={{ whiteSpace: "nowrap" }} className="text-center">{allowed_user.wallet_id}</td>
                                        <td style={{ whiteSpace: "nowrap" }} className="text-center" onClick={() => deleteAllowed_user(allowed_user._id, allowed_user.wallet_id, allowed_user.alias)}><i className="bi bi bi-trash text-danger fs-3"></i></td>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
                <div className="row pt-3 px-5 text-primary fs-3 text-center">
                    <Link to={"/createAllowedUser/" + contract_id} style={{ textDecoration: "none" }} className="text-primary">
                        <i className="bi bi-plus-square"></i>
                        <h5>Añadir wallet</h5>
                    </Link>
                </div>
            </div>
        </div>
    )
}