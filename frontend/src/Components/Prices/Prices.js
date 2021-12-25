import { useState } from "react";
import PricesInGrid from "./PricesInGrid";
import PricesInRows from "./PricesInRows";
import PriceSelects from "./PriceSelects";

export default function Prices(props) {
    const [display, setDisplay] = useState("Rows")
    return (
        <>
            <div className="container pt-5 bg-dark my-5 p-5 rounded shadow-lg">

                <div className="row pb-3 pt-3">
                    <form className="d-flex">
                        <input className="form-control me-2" style={{ height: "40px" }} type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-primary text-white" type="submit">Search</button>
                    </form>
                </div>
                <PriceSelects setDisplay={setDisplay} isPhone={props.isPhone} />
                {display == "Rows" ? <PricesInRows /> : <PricesInGrid />}
            </div>
        </>
    )
}