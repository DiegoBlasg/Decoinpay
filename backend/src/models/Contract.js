const { Schema, model } = require('mongoose')

const nodeSchema = new Schema({
    contract_id: {
        type: String,
        require: true
    },
    wallet_id: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    transactions: [
        {
            hash: { type: String, require: true },
            block: { type: String, require: true },
            age: { type: String, require: true },
            from: { type: String, require: true },
            to: { type: String, require: true },
            value: { type: String, require: true },
            txn_fee: { type: String, require: true }
        }
    ],
    allowed_users: [
        {
            wallet_id: { type: String, require: true },
            alias: { type: String, require: true }
        }
    ]
});

module.exports = model('Contract', nodeSchema)