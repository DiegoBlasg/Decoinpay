import { useState } from "react";
import { Link } from "react-router-dom";
import useContract from "../../Hooks/useContracts";

export default function ContractInfoHeader(props) {

    const info = props.BasicInfoContract;
    const contractID = "0x" + info._id;
    const shortID = contractID.substring(0, 5) + "..." + contractID.substring(contractID.length - 4, contractID.length)

    const [isChecked, setIsChecked] = useState(false);
    function handleChange() {
        setIsChecked(!isChecked)
    }


    return (
        props.isPhone ?
            <>
                <div className="row mx-3">
                    <div className="col col-2 text-primary">
                        <Link to={"/contracts"}><i className="bi bi-arrow-left-square-fill text-white fs-1"></i></Link>
                    </div>
                    <div className="col col-8">
                        <h3 className="text-white text-center">{info.name}</h3>
                        <h5 className="text-white text-center">{shortID}</h5>
                    </div>
                    <div className="col col-2 text-primary fs-1">
                        {
                            props.isOwner ?
                                <Link to={"/ajustes/" + info._id}><i className="bi bi-gear"></i></Link>
                                :
                                <></>
                        }
                    </div>
                </div>
                <div className="row mx-3 mt-3">
                    <p className="text-white text-center" style={{ fontSize: "18px" }}>transacciones en pantalla</p>
                </div>
                <div className="row mx-3">
                    <div className="col col-4 offset-4 d-flex justify-content-center">
                        <label className="switch">
                            <input type="checkbox" value={isChecked} onChange={handleChange} />
                            <div className="slider"></div>
                        </label>

                    </div>
                </div>
            </>
            :
            <>
                <div className="row mx-3">
                    <div className="col col-2 text-primary">
                        <Link to={"/contracts"}><i className="bi bi-arrow-left-square-fill text-white fs-1"></i></Link>
                    </div>
                    <div className="col col-8">
                        <h3 className="text-white text-center">{info.name}</h3>
                        <h5 className="text-white text-center">{"0x" + info._id}</h5>
                    </div>
                    <div className="col col-2 text-primary fs-1">
                        {
                            props.isOwner ?
                                <Link to={"/ajustes/" + info._id}><i className="bi bi-gear"></i></Link>
                                :
                                <></>
                        }
                    </div>
                </div>
                <div className="row mx-3 mt-3">
                    <p className="text-white text-center" style={{ fontSize: "18px" }}>Ver transacciones en pantalla completa</p>
                </div>
                <div className="row mx-3">
                    <div className="col col-4 offset-4 d-flex justify-content-center">
                        <label className="switch">
                            <input type="checkbox" value={isChecked} onChange={handleChange} />
                            <div className="slider"></div>
                        </label>

                    </div>
                </div>
            </>

    )
}