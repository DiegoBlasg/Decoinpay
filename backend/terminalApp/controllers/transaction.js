const Contract = require('../models/Contract')
const User = require('../models/User')
const Transaction = require('../models/Transactions')
const fs = require('file-system')

const txncommand = {}

let txn = { message: "Nothing found" };

txncommand.info = async () => {
    const res = await Transaction.find()
    txn = res.map(txn => ({
        _id: txn._id,
        contract_id: txn.contract_id,
        valueInBNB: txn.valueInBNB,
        ispaid: txn.ispaid,
        transactionHash: txn.transactionHash,
        return_url: txn.return_url,
        cancel_url: txn.cancel_url
    }));
}

txncommand.info_f = async (file) => {
    fs.writeFile(`./decoinviewfiles/transactions/${file}.json`, JSON.stringify(txn))
    console.log(`file ${file}.json created`);
}
txncommand.info_t = async (txnid) => {
    const res = await Transaction.findById(txnid)
    txn = {
        _id: res._id,
        contract_id: res.contract_id,
        valueInBNB: res.valueInBNB,
        ispaid: res.ispaid,
        transactionHash: res.transactionHash,
        return_url: res.return_url,
        cancel_url: res.cancel_url
    };
}

txncommand.info_u = async (userwallet, txnhash = null) => {
    if (txnhash) {
        const user = await User.findOne({ wallet_id: userwallet })
        const transactions = await User.findOne({ wallet_id: userwallet }, {
            transactions: {
                $elemMatch: {
                    hash: txnhash
                }
            }
        })
        txn = {
            user_owner: user.wallet_id,
            transaction: transactions.transactions
        }
    } else {
        const user = await User.findOne({ wallet_id: userwallet })
        txn = user.transactions
    }
}
txncommand.info_c = async (contractid, txnhash = null) => {
    if (txnhash) {
        const contract = await Contract.findById(contractid)
        const transaction = await Contract.findById(contractid, {
            transactions: {
                $elemMatch: {
                    hash: txnhash
                }
            }
        })
        txn = {
            contract_id: contractid,
            contract_owner: contract.wallet_id,
            transaction: transaction.transactions
        }
    } else {
        const contract = await Contract.findById(contractid)
        txn = contract.transactions
    }
}

txncommand.view = async () => {
    console.log(txn);
}

module.exports = txncommand;