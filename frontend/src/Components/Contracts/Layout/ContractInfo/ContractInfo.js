import React, { useContext, useState } from "react";
import { useParams } from 'react-router-dom';
import ContractInfoHeader from "./ContractInfoHeader";
import useContract from "../../Hooks/useContracts";
import UserContext from "../../../../Context/User/UserContext";
import TransactionsFilter from "../../../TransactionsFilter";

export default function ContractInfo(props) {
    const contract_id = useParams().id;
    const { selectedUser } = useContext(UserContext);
    const { isOwner, contracts, transactions, getOneContractInfo } = useContract(contract_id);
    const [search, setSearch] = useState("");
    const [filterDate, setFilterDate] = useState(["", "", ""]);

    const filteredTransactions = transactions.filter((transaction) =>
        (transaction.hash.toLowerCase().includes(search.toLowerCase()) ||
            transaction.block.toLowerCase().includes(search.toLowerCase()) ||
            transaction.from.toLowerCase().includes(search.toLowerCase()) ||
            transaction.to.toLowerCase().includes(search.toLowerCase())) && (
            transaction.age.substring(0, 4).includes(filterDate[0]) &&
            transaction.age.substring(5, 7).includes(filterDate[1]) &&
            transaction.age.substring(8, 10).includes(filterDate[2]))
    )
    React.useEffect(() => {
        getOneContractInfo();
    }, [selectedUser])
    return (
        <div className="container pt-5 bg-dark my-5 p-5 rounded shadow-lg">

            <ContractInfoHeader isPhone={props.isPhone} BasicInfoContract={contracts} isOwner={isOwner} />

            <TransactionsFilter isPhone={props.isPhone} setFilterDate={setFilterDate} setSearch={setSearch} />

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
                            filteredTransactions.slice(0).reverse().map(transaction => (
                                <tr key={transaction.hash}>
                                    <th scope="row"><a target="_blank" href={`https://bscscan.com/tx/${transaction.hash}`} style={{ textDecoration: "none" }} className="link-info">{(transaction.hash).substring(0, 20) + "..."}</a></th>
                                    <td style={{ whiteSpace: "nowrap" }}><a target="_blank" href={`https://bscscan.com/block/${transaction.block}`} style={{ textDecoration: "none" }} className="link-info">{transaction.block}</a></td>
                                    <td style={{ whiteSpace: "nowrap" }}>{transaction.age}</td>
                                    <td style={{ whiteSpace: "nowrap" }}><a target="_blank" href={`https://bscscan.com/address/${transaction.from}`} style={{ textDecoration: "none" }} className="link-info">{(transaction.from).substring(0, 20) + "..."}</a></td>
                                    <td style={{ whiteSpace: "nowrap" }}><a target="_blank" href={`https://bscscan.com/address/${transaction.to}`} style={{ textDecoration: "none" }} className="link-info">{(transaction.to).substring(0, 20) + "..."}</a></td>
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
