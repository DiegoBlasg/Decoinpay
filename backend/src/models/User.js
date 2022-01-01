const { Schema, model } = require('mongoose')

const nodeSchema = new Schema({
    wallet_id: {
        type: String,
        require: true
    },
    business_user: {
        type: Boolean,
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
    added_tokens: [{
        type: String,
        require: true
    }],
    favourites_tokens: [{
        type: String,
        require: true
    }]
});

module.exports = model('User', nodeSchema)
