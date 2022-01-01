import React from "react"
import Fav from '../../Fav';
import usePrices from "../../usePrices";

export default function FavouriteTokenRow(props) {
    const { specificCoin, getOneCoin, formatDollar } = usePrices();

    React.useEffect(() => {
        getOneCoin(props.fovouriteTokens);
    }, [])

    return (
        specificCoin.map(coin => (
            <tr style={{ height: "55px" }} key={coin.id}>
                <td style={{ whiteSpace: "nowrap" }}>
                    <div className="mx-2"><Fav id={coin.id} /></div>
                </td>
                <td style={{ whiteSpace: "nowrap" }}>{coin.market_cap_rank}</td>
                <th><img alt="CoinLogo" src={coin.image} style={{ width: "27px" }} className="mx-2" />{`${coin.name} (${coin.symbol.toUpperCase()})`}</th>
                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.current_price, 16)}</td>
                <td className="text-muted">{formatDollar(coin.ath, 16)}</td>
                <td className={coin.price_change_percentage_24h > 0 ? "text-success" : "text-danger"}>{coin.price_change_percentage_24h + "%"}</td>
                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.market_cap, 16)}</td>
                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.market_cap, 16)}</td>
                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.circulating_supply, 16)}</td>
            </tr>
        ))

    )
}