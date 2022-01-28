import axios from "axios";

export default function OnlyDevPage() {
    //Esto es un ejemplo muy simple de lo que haria alguien que consume esta la api

    const onSubmit = async () => {
        const newTransaction = {
            valueInBNB: "0.02",
            return_url: "https://decoinpay.com/account",
            cancel_url: "https://decoinpay.com/onlydevpage"
        };

        //Aqui para que funcione hay que cambial los datos con los tuyos
        const authorization = {
            headers: {
                contractid: '61eb172c76cef5cdba6cf5c3',
                api_key: 'fbqiiffj42ezqwq0nz6g1r0wyjzcczjjkkzoqzgflhfphe8ohu'
            }
        }
        const res = await axios.post("/api/transactions", newTransaction, authorization)

        //aqui dirige a https://decoinpay.com/pay/has-de-la-transaccion
        window.location.href = "/pay/" + res.data.hash
    }

    return (
        <div className="container bg-dark my-5 p-4 pt-4 rounded shadow-lg">
            <div className="card mx-auto my-5 bg-dark border border-3 border-primary" style={{ width: "18rem" }}>
                <div className="card-body text-center text-white">
                    <h4 className="card-title my-3">Producto de prueba</h4>
                    <h5 className="card-title text-warning my-3">0.02 BNB</h5>
                    <button className="btn btn-primary my-3" onClick={onSubmit}>Pagar</button>
                </div>
            </div>
        </div>
    )
}