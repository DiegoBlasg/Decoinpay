import { useState } from "react";
import { Link } from "react-router-dom";
import ModalAddToken from "../Modals/ModalAddToken";

export default function PriceSelects(props) {
    const [modalAddTokenIsOpen, setModalAddTokenIsOpen] = useState(false)
    const openmodalAddTokenIsOpen = () => {
        setModalAddTokenIsOpen(true);
    }
    return (
        <>
            {
                props.isPhone ?
                    <>
                        <div className="row py-3">
                            <div className="col col-2 text-primary fs-1 text-center">
                                <i className="bi bi-plus-square" onClick={() => openmodalAddTokenIsOpen()}></i>
                            </div>
                            <div className="col col-10 text-center">
                                <select className="btn btn-primary w-100" style={{ height: "40px" }} onChange={(e) => props.setSowTokens(e.target.value)}>
                                    <option value="AllPrices">Top 100</option>
                                    <option value="FavouritesPrices">Favoritas</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col col-10 text-center">
                                <select className="btn btn-primary w-100" style={{ height: "40px" }} onChange={(e) => props.setDisplay(e.target.value)}>
                                    <option value="Rows">Lineal</option>
                                    <option value="Grid">Cuadricula</option>
                                </select>
                            </div>
                            <div className="col col-2 text-primary fs-1 text-center">
                                <i className="bi bi-arrow-clockwise" onClick={props.getCois()}></i>
                            </div>
                        </div>
                    </>
                    :
                    <div className="row pt-3">
                        <div className="col col-1 text-primary fs-1 text-center">
                            <i className="bi bi-plus-square" onClick={() => openmodalAddTokenIsOpen()}></i>
                        </div>
                        <div className="col col-5">
                            <div align="center">
                                <select className="btn btn-primary w-50" style={{ height: "40px" }} onChange={(e) => props.setSowTokens(e.target.value)}>
                                    <option value="AllPrices">Top 100</option>
                                    <option value="FavouritesPrices">Favoritas</option>
                                </select>
                            </div>
                        </div>
                        <div className="col col-5">
                            <div align="center">
                                <select className="btn btn-primary w-50" id="info" style={{ height: "40px" }} onChange={(e) => props.setDisplay(e.target.value)}>
                                    <option value="Rows">Lineal</option>
                                    <option value="Grid">Cuadricula</option>
                                </select>
                            </div>
                        </div>
                        <div className="col col-1 text-primary fs-1 text-center">
                            <i className="bi bi-arrow-clockwise" onClick={props.getCois()}></i>
                        </div>
                    </div>
            }
            <ModalAddToken modalIsOpen={modalAddTokenIsOpen} setIsOpen={setModalAddTokenIsOpen} />
        </>
    )
}