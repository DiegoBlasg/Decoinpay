import React from "react"
import Fav from '../../Fav';
import usePrices from "../../../Hooks/usePrices";
import { Link } from "react-router-dom";

export default function FavouriteTokenRow(props) {
    const { specificCoin, getOneCoin, formatDollar } = usePrices();

    const filteredCoins = specificCoin.filter((specificCoin) =>
        specificCoin.name.toLowerCase().includes(props.search.toLowerCase()) ||
        specificCoin.symbol.toLowerCase().includes(props.search.toLowerCase())
    )

    React.useEffect(() => {
        getOneCoin(props.fovouriteTokens);
    }, [])

    return (
        filteredCoins.map(coin => (
            <tr style={{ height: "55px" }} key={coin.id}>
                <td style={{ whiteSpace: "nowrap" }}>
                    <div className="mx-2"><Fav id={coin.id} /></div>
                </td>
                <td style={{ whiteSpace: "nowrap" }}>{coin.market_cap_rank}</td>
                <th><Link to={"/coininfo/" + coin.id} className='text-white' style={{ textDecoration: "none" }}> <img alt="CoinLogo" src={coin.image} style={{ width: "27px" }} className="mx-2" />{`${coin.name} (${coin.symbol.toUpperCase()})`}</Link></th>
                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.current_price, 16)}</td>
                <td className="text-muted">{formatDollar(coin.ath, 16)}</td>
                <td className={coin.price_change_percentage_24h > 0 ? "text-success" : "text-danger"}>{(coin.price_change_percentage_24h > 0 ? "+" : "-") + formatDollar(coin.price_change_percentage_24h, 2).substring(1) + "%"}</td>
                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.market_cap, 16)}</td>
                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.market_cap, 16)}</td>
                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.circulating_supply, 16)}</td>
            </tr>
        ))

    )
}