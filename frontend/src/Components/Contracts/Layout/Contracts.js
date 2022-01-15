import { useState } from "react";
import ContractsCards from "./ContractsCards/ContractsCards";

export default function Contracts(props) {
    const [search, setSearch] = useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    }

    return (
        <>
            <div className="container bg-dark my-5 p-3 pb-4 rounded shadow-lg">

                <div className="row pb-4 pt-3">
                    <form className="d-flex">
                        <input className="form-control me-2" style={{ height: "50px" }} onChange={e => setSearch(e.target.value)} type="search" placeholder="Search" aria-label="Search" />
                    </form>
                </div>

                <ContractsCards isPhone={props.isPhone} search={search} modalIsOpen={modalIsOpen} setIsOpen={setIsOpen} />

                <div className="row pt-3 px-5 text-primary fs-1 text-center" style={{ cursor: "pointer" }} onClick={openModal}>

                    <i className="bi bi-plus-square"></i>
                    <h5>Añadir contrato</h5>
                </div>
            </div>
        </>
    )
} 