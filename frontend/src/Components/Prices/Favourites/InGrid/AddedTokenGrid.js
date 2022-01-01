import React from "react";
import usePrices from "../../usePrices";

export default function AddedTokenGrid(props) {
    const { token, getOneToken, formatDollar, deleteAdded_token } = usePrices();

    React.useEffect(() => {
        getOneToken(props.addedTokens);
    }, [])

    return (
        token.map(coin => (
            < div className="card text-white bg-dark my-3 " style={{ minWidth: "13rem", marginRight: "1rem" }} key={coin.name}>
                <div className={`card-header border border-secondary rounded-top`}>
                    <div className="row">
                        <div className="col col-2 fs-4" style={{ whiteSpace: "nowrap" }}>-</div>
                        <div className="col col-8 text-center fs-4"></div>
                        <div className="col col-2 fs-4 px-2 text-white"><i className="bi bi-trash-fill text-danger" onClick={() => deleteAdded_token(props.addedTokens)} /></div>
                    </div>
                    <div className="row">
                        <div className="text-center fs-4">{coin.name}</div>
                    </div>
                    <div className="row">
                        <h3 className="card-title text-center text-secondary fs-5">{coin.symbol.toUpperCase()}</h3>
                    </div>
                    <div className="row mt-3">
                        <h3 className="card-title text-center fs-4">{formatDollar(coin.price, 4)}</h3>
                    </div>
                </div>
                <div className={`card-body bg-secondary rounded-bottom`}>
                    <h4 className="card-title text-center"></h4>
                </div>
            </div>
        ))
    )
}