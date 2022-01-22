const transactionsCtrl = {};

const Transactions = require('../models/Transactions')
const Contract = require('../models/Contract')
const User = require('../models/User')
const CryptoJs = require('crypto-js')


const decryptAdminText = (text) => {
    const bytes = CryptoJs.AES.decrypt(text, process.env.ADMINPASSWORD || "9876")
    const textoDescifrado = bytes.toString(CryptoJs.enc.Utf8)
    return textoDescifrado.toLowerCase()
}
const decryptText = (text) => {
    const bytes = CryptoJs.AES.decrypt(text, process.env.PASSWORD || "4321")
    const textoDescifrado = bytes.toString(CryptoJs.enc.Utf8)
    return textoDescifrado.toLowerCase()
}

const getAuth = async (id, key) => {
    try {
        const contract = await Contract.findById(id);
        if (contract.api_key) {
            if (decryptAdminText(contract.api_key) == key) {
                return id
            }
        }
        return null
    } catch (error) {
        return null
    }
}

transactionsCtrl.newTransactions = async (req, res) => {
    try {
        const { valueInBNB, return_url, cancel_url } = req.body;
        const isAuthenticated = await getAuth(req.header("contractid"), req.header("api_key"))
        if (isAuthenticated) {
            const newTransaction = new Transactions({
                contract_id: isAuthenticated,
                valueInBNB: valueInBNB,
                ispaid: false,
                transactionHash: "",
                return_url: return_url,
                cancel_url: cancel_url
            });
            await newTransaction.save();
            res.json({ message: 'Trasnsaction created', hash: newTransaction._id, contract_id: newTransaction.contract_id });
        } else {
            res.status(404).json({ mensaje: "credenciales no encontradas" });
        }
    } catch (error) {
        res.status(404).json({ mensaje: "credenciales no encontradas" });
    }

}

transactionsCtrl.getOneTransaction = async (req, res) => {
    try {
        const transaction = await Transactions.findById(req.params.idtransaction);
        res.json(transaction);
    } catch (error) {
        res.status(404).json({ mensaje: "transaction no encontrada" });
    }
}

transactionsCtrl.updateOneTransaction = async (req, res) => {
    try {
        const { transactionHash } = req.body;
        const user = await User.findOne({ wallet_id: decryptText(req.header('Wallet')) })
        const txn = await Transactions.find();
        for (let i = 0; i < txn.length; i++) {
            if (txn[i].transactionHash == transactionHash) {
                res.status(404).json({ mensaje: "transaction no encontrada" });
                return
            }

        }

        for (let i = 0; i < user.transactions.length; i++) {
            if (user.transactions[i].hash == transactionHash) {
                await Transactions.findByIdAndUpdate(req.params.idtransaction, {
                    ispaid: true,
                    transactionHash: transactionHash
                });
                res.json({ message: 'Transaction made' });
                return
            }
        }
        res.status(404).json({ mensaje: "transaction no encontrada" });
    } catch (error) {
        res.status(404).json({ mensaje: "transaction no encontrada" });
    }
}

transactionsCtrl.newAdminTransactions = async (req, res) => {
    try {
        let isUser = false;
        const contract = await Contract.findById(req.params.id);
        if (contract.wallet_id == decryptText(req.header('Wallet'))) {
            isUser = true;
        } else {
            const user = await User.findOne({ wallet_id: decryptText(req.header('Wallet')) })
            for (let i = 0; i < user.contracts_with_acces.length; i++) {
                if (user.contracts_with_acces[i] == req.params.id) {
                    isUser = true
                }
            }
        }
        if (isUser) {
            const { valueInBNB } = req.body;
            if (contract) {
                const newTransaction = new Transactions({
                    contract_id: contract._id,
                    valueInBNB: valueInBNB
                });
                await newTransaction.save();
                res.json({ message: 'Trasnsaction created', hash: newTransaction._id, contract_id: newTransaction.contract_id });
            } else {
                res.status(404).json({ mensaje: "credenciales no encontradas" });
            }
        } else {
            res.status(403).json({ mensaje: "no tienes acceso a este contrato" });
        }
    } catch (error) {
        res.status(404).json({ mensaje: "no se ha encontrado el contrato" });
    }

}

transactionsCtrl.getOneAdminTransaction = async (req, res) => {
    try {
        const transaction = await Transactions.findById(req.params.idtransaction);
        res.json(transaction);
    } catch (error) {
        res.status(404).json({ mensaje: "transaction no encontrada" });
    }
}
module.exports = transactionsCtrl;

