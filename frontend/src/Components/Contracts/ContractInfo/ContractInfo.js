import React from "react";
import { useParams } from 'react-router-dom';
import ContractInfoHeader from "./ContractInfoHeader";
import useContract from "../useContracts";

export default function ContractInfo(props) {
    const contract_id = useParams().id;
    const { contracts, transactions, getOneContract } = useContract(contract_id);

    React.useEffect(async () => {
        getOneContract();
    }, [])

    return (
        <div className="container pt-5 bg-dark my-5 p-5 rounded shadow-lg">

            <ContractInfoHeader isPhone={props.isPhone} BasicInfoContract={contracts} />

            <div className="row pb-5 pt-4">
                <form className="d-flex">
                    <input className="form-control me-2" style={{ height: "35px" }} type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-primary text-white" style={{ height: "35px" }} type="submit">Search</button>
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
                            transactions.transaction.map(transaction => (
                                <tr>
                                    <th style={{ whitespace: "nowrap" }} scope="row"><a href="/" style={{ textDecoration: "none" }} className="link-info">0x2d1f8c4bbd0bb68916e22...</a></th>
                                    <td style={{ whiteSpace: "nowrap" }}><a href="/" style={{ textDecoration: "none" }} className="link-info">13250498</a></td>
                                    <td style={{ whiteSpace: "nowrap" }}>34 secs ago</td>
                                    <td style={{ whiteSpace: "nowrap" }}>0xbf3fc05517c6e649ae2d1...</td>
                                    <td style={{ whiteSpace: "nowrap" }}><a href="/" style={{ textDecoration: "none" }} className="link-info"><i className="bi bi-file-earmark-text text-info"></i> PancakeSwap: Router v2</a></td>
                                    <td style={{ whiteSpace: "nowrap" }}>0 BNB</td>
                                    <td style={{ whiteSpace: "nowrap" }}>0.000590815</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        </div>
    );
}
