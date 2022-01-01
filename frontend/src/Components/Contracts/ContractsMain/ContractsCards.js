import React from 'react'
import { Link } from 'react-router-dom';
import useContract from "../useContracts";

export default function ContractsCards(props) {

    const { contracts, getContracts, deleteContract } = useContract();

    const filteredContracts = contracts.contract.filter((contract) =>
        contract.name.toLowerCase().includes(props.search.toLowerCase()) ||
        contract.contract_id.toLowerCase().includes(props.search.toLowerCase())
    )

    React.useEffect(() => {
        getContracts();
    }, [])
    return (
        <div>
            {
                props.isPhone ?
                    filteredContracts.map(contract => (
                        <div className="container" key={contract._id}>
                            <div className="row py-2 px-4">
                                <Link to={"/info/" + contract._id} style={{ textDecoration: "none" }}>
                                    <div className="card bg-primary shadow-lg">
                                        <div className="card-body">
                                            <blockquote className="blockquote mb-0">
                                                <h4 className="text-white py-2 text-center">{contract.name}</h4>
                                                <footer className="blockquote-footer text-light py-2">{contract.contract_id.substring(0, 4) + "..." + contract.contract_id.substring(contract.contract_id.length - 4, contract.contract_id.length)}</footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="row px-4 pb-3">
                                <div>
                                    <div className="card bg-danger shadow-lg">
                                        <div className="card-body fs-1 text-center mt-2 text-dark py-0" onClick={() => deleteContract(contract._id)}>
                                            <i className="bi bi-trash-fill"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                    :
                    filteredContracts.map(contract => (
                        < div className="row py-3 px-5" key={contract._id}>
                            <div className="col col-11">

                                <Link to={"/info/" + contract._id} style={{ textDecoration: "none" }}>
                                    <div className="card bg-primary shadow-lg">
                                        <div className="card-body">
                                            <blockquote className="blockquote mb-0">
                                                <h4 className="text-white py-2">{contract.name}</h4>
                                                <footer className="blockquote-footer text-light py-2">{contract.contract_id}</footer>
                                            </blockquote>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="col col-1 text-dark d-flex align-items-center justify-content-center bg-danger rounded fs-1" onClick={() => deleteContract(contract._id)} >
                                <i className="bi bi-trash-fill"></i>
                            </div>
                        </div >
                    ))
            }
        </div>


    )

}
