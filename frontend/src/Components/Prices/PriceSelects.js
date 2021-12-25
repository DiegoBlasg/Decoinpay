export default function PriceSelects(props) {
    return (
        props.isPhone ?
            <>
                <div className="row py-3">
                    <div className="col col-2 text-primary fs-1 text-center">
                        <i className="bi bi-plus-square"></i>
                    </div>
                    <div className="col col-10 text-center">
                        <select className="btn btn-primary w-100" style={{ height: "40px" }}>
                            <option value="1">Top 100</option>
                            <option value="2">Mis monedas</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <select className="btn btn-primary" style={{ height: "40px" }} onChange={(e) => props.setDisplay(e.target.value)}>
                        <option value="Lineal">Lineal</option>
                        <option value="Cuadricula">Cuadricula</option>
                    </select>
                </div>
            </>
            :
            <div className="row pt-3">
                <div className="col col-1 text-primary fs-1 text-center">
                    <i className="bi bi-plus-square"></i>
                </div>
                <div className="col col-5">
                    <div align="center">
                        <select className="btn btn-primary w-50" style={{ height: "40px" }}>
                            <option value="1">Top 100</option>
                            <option value="2">Mis monedas</option>
                        </select>
                    </div>
                </div>
                <div className="col col-6">
                    <div align="center">
                        <select className="btn btn-primary w-50" id="info" style={{ height: "40px" }} onChange={(e) => props.setDisplay(e.target.value)}>
                            <option value="Rows">Lineal</option>
                            <option value="Grid">Cuadricula</option>
                        </select>
                    </div>
                </div>
            </div>
    )
}