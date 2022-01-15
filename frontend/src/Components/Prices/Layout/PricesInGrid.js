import Fav from "./Fav";
import usePrices from "../Hooks/usePrices";
import { Link } from "react-router-dom";

export default function PricesInGrid(props) {
    const { formatDollar } = usePrices();

    return (

        <div className="row mt-4">
            <div className="card-group">
                {
                    props.coins.map(coin => (
                        < div className="card text-white bg-dark my-3 " style={{ minWidth: "13rem", marginRight: "1rem" }} key={coin.id}>
                            <div className={`card-header border border-${coin.price_change_percentage_24h > 0 ? "success" : "danger"} rounded-top`}>
                                <div className="row">
                                    <div className="col col-2 fs-4" style={{ whiteSpace: "nowrap" }}>{coin.market_cap_rank}</div>
                                    <div className="col col-8 text-center fs-4"><img alt="CoinLogo" src={coin.image} style={{ width: "27px" }} className="mx-2" /></div>
                                    <div className="col col-2 fs-4 px-2 text-white">
                                        <Fav id={coin.id} tokens={props.favouriteTokens} /></div>
                                </div>
                                <div className="row">
                                    <div className="text-center mt-2 fs-3">
                                        <Link to={"/coininfo/" + coin.id} className='text-white' style={{ textDecoration: "none" }}>
                                            {coin.symbol.toUpperCase()}
                                            {coin.price_change_percentage_24h > 0 ? <i className="bi bi-graph-up-arrow text-success mx-2 fs-5" /> : <i className="bi bi-graph-down-arrow text-danger mx-2 fs-5" />}
                                        </Link></div>
                                </div>
                                <div className="row mt-2">
                                    <h3 className="card-title text-center fs-4">{formatDollar(coin.current_price, 16)}</h3>
                                </div>
                                <div className="row">
                                    <h3 className="card-title text-center text-secondary fs-5">{formatDollar(coin.market_cap, 16)}</h3>
                                </div>
                            </div>
                            <div className={`card-body ${coin.price_change_percentage_24h > 0 ? "bg-success" : "bg-danger"} rounded-bottom`}>
                                <h4 className="card-title text-center"><i className={`bi bi-caret-${coin.price_change_percentage_24h > 0 ? "up" : "down"}-fill mx-2`}></i>{coin.price_change_percentage_24h + "%"}</h4>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div >
    )
}