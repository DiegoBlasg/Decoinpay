const Contract = require('../models/Contract')
const fs = require('file-system')

const contractcommand = {}

let contracts = { message: "Nothing found" };

contractcommand.info = async () => {
    const res = await Contract.find()
    contracts = res.map(contract => ({
        _id: contract._id,
        wallet_id: contract.wallet_id,
        name: contract.name,
        allowed_users: contract.allowed_users,
        api_key: contract.api_key,
        transactions_hashes: contract.transactions.map(txn => (txn.hash))
    }))
}

contractcommand.info_f = async (file) => {
    fs.writeFile(`./src/files/contracts/${file}.json`, JSON.stringify(contracts))
    console.log(`file ${file}.json created`);
}

contractcommand.info_c = async (hash) => {
    const res = await Contract.findById(hash)
    contracts = {
        _id: res._id,
        wallet_id: res.wallet_id,
        name: res.name,
        allowed_users: res.allowed_users,
        api_key: res.api_key,
        transactions_hashes: res.transactions.map(txn => (txn.hash))
    };
}

contractcommand.view = async () => {
    console.log(contracts);
}

module.exports = contractcommand;