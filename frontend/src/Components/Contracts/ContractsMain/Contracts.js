import { Link } from "react-router-dom";
import ContractsCards from "./ContractsCards";

export default function Contracts(props) {
    return (
        <div className="container bg-dark my-5 p-3 pb-4 rounded shadow-lg">

            <div className="row pb-4 pt-3">
                <form className="d-flex">
                    <input className="form-control me-2" style={{ height: "50px" }} type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-primary text-white" type="submit">Search</button>
                </form>
            </div>

            <ContractsCards isPhone={props.isPhone} />

            <div className="row pt-3 px-5 text-primary fs-1 text-center">
                <Link to="/createcontract" style={{ textDecoration: "none" }} className="text-primary">
                    <i className="bi bi-plus-square"></i>
                    <h5>Añadir contrato</h5>
                </Link>
            </div>
        </div>
    )
} 