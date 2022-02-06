const User = require('../models/User')
const fs = require('file-system')

const usercommand = {}

let users = { message: "Nothing found" };

usercommand.info = async () => {
    const res = await User.find()
    users = res.map(user => ({
        _id: user._id,
        wallet_id: user.wallet_id,
        contracts_with_acces: user.contracts_with_acces,
        added_tokens: user.added_tokens,
        favourites_tokens: user.favourites_tokens,
        transactions_hashes: user.transactions.map(txn => (txn.hash))
    }));
}

usercommand.info_f = async (file) => {
    fs.writeFile(`./decoinviewfiles/users/${file}.json`, JSON.stringify(users))
    console.log(`file ${file}.json created`);
}

usercommand.info_u = async (wallet) => {
    const res = await User.findOne({ wallet_id: wallet })
    users = {
        _id: res._id,
        wallet_id: res.wallet_id,
        contracts_with_acces: res.contracts_with_acces,
        added_tokens: res.added_tokens,
        favourites_tokens: res.favourites_tokens,
        transactions_hashes: res.transactions.map(txn => (txn.hash))
    };
}
usercommand.view = async () => {
    console.log(users);
}

module.exports = usercommand;