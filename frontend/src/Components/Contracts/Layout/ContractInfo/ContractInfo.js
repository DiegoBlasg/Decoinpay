import React, { useContext } from "react";
import { useParams } from 'react-router-dom';
import ContractInfoHeader from "./ContractInfoHeader";
import useContract from "../../Hooks/useContracts";
import UserContext from "../../../../Context/User/UserContext";

export default function ContractInfo(props) {
    const contract_id = useParams().id;
    const { selectedUser } = useContext(UserContext);
    const { isOwner, contracts, transactions, getOneContractInfo } = useContract(contract_id);

    React.useEffect(() => {
        getOneContractInfo();
    }, [selectedUser])
    return (
        <div className="container pt-5 bg-dark my-5 p-5 rounded shadow-lg">

            <ContractInfoHeader isPhone={props.isPhone} BasicInfoContract={contracts} isOwner={isOwner} />

            <div className="row pb-5 pt-4">
                <form className="d-flex">
                    <input className="form-control me-2" style={{ height: "35px" }} type="search" placeholder="Search" aria-label="Search" />
                </form>
            </div>
            <div className="row table-responsive">
                <table className="table table-dark table-striped">
                    <thead className="thead-dark">
                        <tr>
                            <th scope="col">Txn Hash</th>
                            <th scope="col">Block</th>
                            <th scope="col">Age</th>
                            <th scope="col">From</th>
                            <th scope="col">To</th>
                            <th scope="col">Value</th>
                            <th scope="col">[Txn Fee]</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            transactions.slice(0).reverse().map(transaction => (
                                <tr key={transaction.hash}>
                                    <th scope="row"><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">{(transaction.hash).substring(0, 20) + "..."}</a></th>
                                    <td style={{ whiteSpace: "nowrap" }}><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">{transaction.block}</a></td>
                                    <td style={{ whiteSpace: "nowrap" }}>{transaction.age}</td>
                                    <td style={{ whiteSpace: "nowrap" }}>{(transaction.from).substring(0, 20) + "..."}</td>
                                    <td style={{ whiteSpace: "nowrap" }}><a href="/cuenta" style={{ textDecoration: "none" }} className="link-info">{(transaction.to).substring(0, 20) + "..."}</a></td>
                                    <td style={{ whiteSpace: "nowrap" }}>{transaction.value}</td>
                                    <td style={{ whiteSpace: "nowrap", fontSize: "12px" }} className='text-muted'>{transaction.txn_fee}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
}
