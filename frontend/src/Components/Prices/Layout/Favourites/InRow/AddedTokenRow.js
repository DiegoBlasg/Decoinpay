import React from "react";
import usePrices from "../../../Hooks/usePrices";

export default function AddedTokenRow(props) {
    const { token, getOneToken, formatDollar, deleteAdded_token } = usePrices();

    const filteredCoins = token.filter((token) =>
        token.name.toLowerCase().includes(props.search.toLowerCase()) ||
        token.symbol.toLowerCase().includes(props.search.toLowerCase())
    )

    React.useEffect(() => {
        getOneToken(props.addedTokens);
    }, [])

    return (
        filteredCoins.map(coin => (
            <tr style={{ height: "55px" }} key={coin.name}>
                <td style={{ whiteSpace: "nowrap" }}>
                    <div className="mx-2"><i className="bi bi-trash-fill text-danger" onClick={() => deleteAdded_token(props.addedTokens, coin.name)} /></div>
                </td>
                <td style={{ whiteSpace: "nowrap" }}>-</td>
                <th>{`${coin.name} (${coin.symbol})`}</th>
                <td style={{ whiteSpace: "nowrap" }}>{formatDollar(coin.price, 4)}</td>
                <td className="text-muted">-</td>
                <td>-</td>
                <td style={{ whiteSpace: "nowrap" }}>-</td>
                <td style={{ whiteSpace: "nowrap" }}>-</td>
                <td style={{ whiteSpace: "nowrap" }}>-</td>
            </tr>
        ))
    )
}