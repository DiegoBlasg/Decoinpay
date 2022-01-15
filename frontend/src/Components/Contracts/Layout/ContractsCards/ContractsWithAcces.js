import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import useContract from "../../Hooks/useContracts";

export default function ContractsWithAcces(props) {

    const { oneContractInArray, getOneContractInfo } = useContract(props.contractid);

    const filteredContracts = oneContractInArray.filter((contract) =>
        contract.name.toLowerCase().includes(props.search.toLowerCase()) ||
        ("0x" + contract._id).toLowerCase().includes(props.search.toLowerCase())
    )

    React.useEffect(() => {
        getOneContractInfo();
    }, [])
    return (
        filteredContracts.map(contract => (
            <div className="container" key={contract._id}>
                < div className="row py-3 px-4">
                    <Link to={"/info/" + contract._id} style={{ textDecoration: "none" }}>
                        <div className="card bg-primary shadow-lg">
                            <div className="card-body">
                                <blockquote className="blockquote mb-0">
                                    <h4 className="text-white py-2">{contract.name}</h4>
                                    <footer className="blockquote-footer text-light py-2">
                                        {
                                            props.isPhone ?
                                                ("0x" + contract._id).substring(0, 4) + "..." + ("0x" + contract._id).substring(("0x" + contract._id).length - 4, ("0x" + contract._id).length)
                                                :
                                                "0x" + contract._id
                                        }
                                    </footer>
                                </blockquote>
                            </div>
                        </div>
                    </Link>
                </div>
            </div>
        ))
    )
}