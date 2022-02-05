const { Schema, model } = require('mongoose')

const nodeSchema = new Schema({
    contract_id: {
        type: String,
        require: true
    },
    valueInBNB: {
        type: String,
        require: true
    },
    ispaid: {
        type: Boolean,
        require: true
    },
    transactionHash: {
        type: String,
        require: true
    },
    return_url: {
        type: String,
        require: true
    },
    cancel_url: {
        type: String,
        require: true
    },
});

module.exports = model('Transactions', nodeSchema)
