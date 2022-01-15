import React from 'react';
import Fav from './Fav';
import usePrices from "../Hooks/usePrices";
import { Link } from "react-router-dom";

export default function PricesInRows(props) {
    const { formatDollar } = usePrices();

    return (
        <div className="row mt-3 table-responsive">
            <table className="table table-responsive table-dark table-striped">
                <thead className="thead-dark">
                    <tr style={{ height: "55px" }}>
                        <th scope="col"></th>
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Precio</th>
                        <th scope="col">ath</th>
                        <th scope="col">24h%</th>
                        <th scope="col">Market Cap</th>
                        <th scope="col">Circulating Supply</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.coins.map(coin => (

                            <tr style={{ height: "55px" }} key={coin.id}>
                                <td style={{ whiteSpace: "nowrap" }}>
                                    <div className="mx-2"><Fav id={coin.id} tokens={props.favouriteTokens} /></div>
                                </td>
                                <td style={{ whiteSpace: "nowrap" }}>{coin.market_cap_rank}</td>
                                <th><Link to={"/coininfo/" + coin.id} className='text-white' style={{ textDecoration: "none", cursor: "pointer" }}>
                                    <img alt="CoinLogo" src={coin.image} style={{ width: "27px" }} className="mx-2" />
                                    {`${coin.name} (${coin.symbol.toUpperCase()})`}
                                    {coin.price_change_percentage_24h > 0 ? <i className="bi bi-graph-up-arrow text-success mx-2" /> : <i className="bi bi-graph-down-arrow text-danger mx-2" />}
                                </Link></th>
                                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.current_price, 16)}</td>
                                <td className="text-muted">{formatDollar(coin.ath, 16)}</td>
                                <td className={coin.price_change_percentage_24h > 0 ? "text-success" : "text-danger"}>{(coin.price_change_percentage_24h > 0 ? "+" : "-") + formatDollar(coin.price_change_percentage_24h, 2).substring(1) + "%"}</td>
                                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.market_cap, 16)}</td>
                                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.circulating_supply, 16).substring(1)}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}