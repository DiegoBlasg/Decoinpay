import React, { useEffect, useState } from "react"
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import axios from "axios";
import { useParams } from "react-router-dom";


export default function CoinInfo(props) {
    const contract_id = useParams().id;

    const [showTrade, setShowTrade] = useState(false);
    const [coin, setCoin] = useState({})

    const [datos, setDatos] = useState([])
    const [label, setLabel] = useState([])

    const cambiarvalor = () => {
        setShowTrade(!showTrade)
    }
    const cambiardolarvalor = (num) => {
        document.getElementById("dol").value = num * coin.current_price
    }
    const cambiarcoinvalor = (num) => {
        document.getElementById("bit").value = num / coin.current_price
    }

    const formatDollar = (number, maximumSignificantDigits) =>
        new Intl.NumberFormat(
            'en-US',
            {
                style: 'currency',
                currency: 'USD',
                maximumSignificantDigits
            })
            .format(number);

    const data = {
        datasets: [{
            label: "Price",
            data: datos,
            borderColor: "#0275d8",
            pointBorderWidth: 0.1,
            tension: 0.3,

        }],
        labels: label
    }

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                display: false
            },
            y: {
                display: false
            }
        },
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
        },
    }

    useEffect(() => {
        const funcion = async () => {
            const coindata = await axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${contract_id}&order=market_cap_desc&per_page=100&page=1&sparkline=false`)
            setCoin(coindata.data[0])

            const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${contract_id}/market_chart?vs_currency=usd&days=7&interval=hourly`)
            let coinprices = []
            let coindates = []
            for (let i = 0; i < res.data.prices.length; i++) {
                var date = new Date(res.data.prices[i][0]);
                coinprices.push(res.data.prices[i][1])
                coindates.push(date.toString().substring(4, 21))
            }
            setDatos(coinprices);
            setLabel(coindates)

        }
        funcion()
    }, [])
    return (
        <div className="container bg-dark my-5 p-4 pt-4 rounded shadow-lg">
            {
                props.isPhone ?
                    <>
                        <div className="row my-4 shadow p-3 mb-5 bg-dark rounded">
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <img style={{ width: "60px" }} src={coin.image} alt="Coin logo" />
                            </div>
                            <h3 className="text-white text-center mb-3">{`${coin.name} (${coin.symbol ? coin.symbol.toUpperCase() : ""})`}</h3>
                            <h5 className="text-white text-center mb-3">Rank #{coin.market_cap_rank}</h5>
                            <h2 className="text-white text-center mb-3">{formatDollar(coin.current_price, 16)}</h2>
                            <h5 className="text-success text-center mb-3">{(coin.price_change_percentage_24h > 0 ? "+" : "-") + formatDollar(coin.price_change_percentage_24h, 2).substring(1) + "%"}</h5>
                            <h4 className="text-secondary text-center mb-2">Alto Historico</h4>
                            <h4 className="text-white text-center mb-3">{formatDollar(coin.ath, 16)}</h4>
                            <h4 className="text-secondary text-center mb-2">Market Cap</h4>
                            <h4 className="text-white text-center mb-3">{coin.market_cap}</h4>
                            <h4 className="text-secondary text-center mb-2">Circulating Supply</h4>
                            <h4 className="text-white text-center mb-3">{coin.circulating_supply}</h4>
                            <h4 className="text-secondary text-center mb-2">Total Supply</h4>
                            <h4 className="text-white text-center mb-3">{coin.total_supply}</h4>


                        </div>

                        <div className="row my-5 shadow p-3 bg-dark rounded">
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <img src={coin.image} alt="Coin logo" style={{ width: "27px", height: "27px" }} />
                                <h4 className="text-white mx-2">{coin.symbol ? coin.symbol.toUpperCase() : ""}</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <input type="number" className="form-control bg-dark text-white mx-2" />
                            </div>
                            <div className="d-flex align-items-center justify-content-center">
                                <i className="bi bi-arrow-left-right text-white fs-3 my-4" style={{ marginRight: "50px", marginLeft: "30px" }}></i>
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <img src="https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/USD.svg" alt="Coin logo" style={{ width: "27px", height: "27px" }} />
                                <h4 className="text-white mx-2">USD</h4>
                            </div>
                            <div className="d-flex align-items-center justify-content-center mb-3">
                                <input type="number" className="form-control bg-dark text-white mx-2" />
                            </div>
                        </div>
                        <div className="row my-5 shadow p-3 mb-5 bg-dark rounded" onClick={() => cambiarvalor()}>
                            <div className="d-flex align-items-center justify-content-center">
                                <h4 className="text-white">Trade</h4>
                                <i className="bi bi-caret-down-fill text-white mx-2 fs-4"></i>
                            </div>
                        </div>
                        {
                            showTrade ?
                                <div className="d-flex mb-5 justify-content-center align-items-center" >
                                    <h4 className="text-white">Futuro Trade</h4>
                                </div>
                                :
                                <></>
                        }

                        <h2 className="text-center text-white">7 dias</h2>
                        <Line data={data} options={options} />
                    </>
                    :
                    <>
                        <div className="row m-4 shadow p-3 mb-5 bg-dark rounded">
                            <div className="col col-6">
                                <img className="mb-4" style={{ width: "60px" }} src={coin.image} alt="Coin logo" />
                                <h2 className="text-white mb-4">{`${coin.name} (${coin.symbol ? coin.symbol.toUpperCase() : ""})`}</h2>
                                <h4 className="text-white mb-4">Rank #{coin.market_cap_rank}</h4>
                                <h1 className="text-white mb-4">{formatDollar(coin.current_price, 16)}</h1>
                                <h4 className={coin.price_change_percentage_24h > 0 ? "text-success mb-4" : "text-danger mb-4"}>{(coin.price_change_percentage_24h > 0 ? "+" : "-") + formatDollar(coin.price_change_percentage_24h, 2).substring(1) + "%"}</h4>
                            </div>
                            <div className="col col-6">
                                <h3 className="text-secondary mb-2" style={{ textAlign: "right" }}>Alto Historico</h3>
                                <h3 className="text-white mb-3" style={{ textAlign: "right" }}>{formatDollar(coin.ath, 16)}</h3>

                                <h3 className="text-secondary mb-2" style={{ textAlign: "right" }}>Market Cap</h3>
                                <h3 className="text-white mb-3" style={{ textAlign: "right" }}>{formatDollar(coin.market_cap, 16)}</h3>

                                <h3 className="text-secondary mb-2" style={{ textAlign: "right" }}>Circulating Supply</h3>
                                <h3 className="text-white mb-3" style={{ textAlign: "right" }}>{formatDollar(coin.circulating_supply, 16)}</h3>

                                <h3 className="text-secondary mb-2" style={{ textAlign: "right" }}>Total Supply</h3>
                                <h3 className="text-white" style={{ textAlign: "right" }}>{formatDollar(coin.total_supply, 16).substring(1)}</h3>
                            </div>
                        </div>
                        <div className="d-flex justify-content-center my-5 shadow p-3 mb-5 bg-dark rounded">
                            <div className="d-flex align-items-center">

                                <img src={coin.image} alt="Coin logo" style={{ width: "27px", height: "27px" }} />
                                <h4 className="text-white mx-2">{coin.symbol ? coin.symbol.toUpperCase() : ""}</h4>
                                <input type="number" id="bit" className="form-control bg-dark text-white mx-2" onKeyUp={(e) => cambiardolarvalor(e.target.value)} />

                                <i className="bi bi-arrow-left-right text-white fs-3" style={{ marginRight: "50px", marginLeft: "30px" }}></i>

                                <img src="https://s2.coinmarketcap.com/static/cloud/img/fiat-flags/USD.svg" alt="Coin logo" style={{ width: "27px", height: "27px" }} />
                                <h4 className="text-white mx-2">USD</h4>
                                <input type="number" id="dol" className="form-control bg-dark text-white mx-2" onKeyUp={(e) => cambiarcoinvalor(e.target.value)} />

                            </div>
                        </div>
                        <div className="d-flex justify-content-center align-items-center my-5 shadow p-3 mb-5 bg-dark rounded" onClick={() => cambiarvalor()}>
                            <h4 className="text-white">Trade</h4>
                            <i className="bi bi-caret-down-fill text-white mx-2 fs-4"></i>
                        </div>
                        {
                            showTrade ?
                                <div className="d-flex justify-content-center align-items-center" >
                                    <h4 className="text-white">Futuro Trade</h4>
                                </div>
                                :
                                <></>
                        }

                        <div className="container bg-dark my-5 p-5 pt-4 rounded shadow-lg">
                            <h2 className="text-center text-white">7 dias</h2>

                            <Line data={data} options={options} />
                        </div>
                    </>
            }
        </div>
    )
}