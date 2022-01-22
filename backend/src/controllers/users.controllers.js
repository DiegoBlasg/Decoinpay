const usersCtrl = {};

const User = require('../models/User')
const CryptoJs = require('crypto-js')


const decryptText = (text) => {
    const bytes = CryptoJs.AES.decrypt(text, process.env.PASSWORD || "4321")
    const textoDescifrado = bytes.toString(CryptoJs.enc.Utf8)
    return textoDescifrado.toLowerCase()
}

usersCtrl.createUser = async (req, res) => {
    try {
        const users = await User.find();
        for (let i = 0; i < users.length; i++) {
            if (users[i].wallet_id == decryptText(req.header('wallet'))) {
                res.json(users[i]);
                return
            }
        }
        if ((process.env.ADMINPASSWORD || "9876") == decryptText(req.header('admin'))) {
            const { business_user } = req.body;
            const newUser = new User({
                wallet_id: decryptText(req.header('wallet')),
                business_user
            });
            await newUser.save();
            res.json(newUser);
        }
    } catch (error) {
        console.log(error);
    }

}

usersCtrl.getOnlyOneUser = async (req, res) => {
    const user = await User.findOne({ wallet_id: decryptText(req.header('Wallet')) });
    res.json(user);
}

/*usersCtrl.deleteUser = async (req, res) => {
    await User.findOneAndDelete({ wallet_id: decryptText(req.header('Wallet')) });
    res.json({ message: 'user eliminado' });
}*/

usersCtrl.getFavouritesTokens = async (req, res) => {
    const user = await User.findOne({ wallet_id: decryptText(req.header('Wallet')) });
    res.json(user.favourites_tokens);
}

usersCtrl.newFavouriteToken = async (req, res) => {
    const { token_id } = req.body;
    const user = await User.findOne({ wallet_id: decryptText(req.header('Wallet')) })
    let isDuplicated = false
    if (user.favourites_tokens) {
        for (let i = 0; i < user.favourites_tokens.length; i++) {
            if (user.favourites_tokens[i] == token_id) {
                isDuplicated = true
            }
        }
    }
    if (!isDuplicated) {
        await User.findOneAndUpdate({ wallet_id: decryptText(req.header('Wallet')) }, {
            $push: {
                favourites_tokens: token_id
            }
        });
        res.json({ message: 'Token added to favourite' });
    } else {
        res.status(490).json({ mensaje: "Este token ya esta añadido" });
    }
}

usersCtrl.deleteFavouriteToken = async (req, res) => {
    await User.findOneAndUpdate({ wallet_id: decryptText(req.header('Wallet')) }, {
        $pull: { favourites_tokens: req.params.token }
    }
    );
    res.json({ message: 'Favourite Token Delete' });
}

usersCtrl.getAdded_tokens = async (req, res) => {
    const user = await User.findOne({ wallet_id: decryptText(req.header('Wallet')) });
    res.json(user.added_tokens);
}

usersCtrl.newAdded_token = async (req, res) => {
    const { token_contract } = req.body;
    const user = await User.findOne({ wallet_id: decryptText(req.header('Wallet')) })
    let isDuplicated = false
    if (user.added_tokens) {
        for (let i = 0; i < user.added_tokens.length; i++) {
            if (user.added_tokens[i] == token_contract) {
                isDuplicated = true
            }
        }
    }
    if (!isDuplicated) {
        await User.findOneAndUpdate({ wallet_id: decryptText(req.header('Wallet')) }, {
            $push: {
                added_tokens: token_contract
            }
        });
        res.json({ message: 'Token added' });
    } else {
        res.status(493).json({ mensaje: "Este token ya esta añadido" });
    }
}

usersCtrl.deleteAdded_token = async (req, res) => {
    await User.findOneAndUpdate({ wallet_id: decryptText(req.header('Wallet')) }, {
        $pull: { added_tokens: req.params.contract }
    }
    );
    res.json({ message: 'Token Delete' });
}


usersCtrl.getContratWithAccess = async (req, res) => {
    const user = await User.findOne({ wallet_id: decryptText(req.header('Wallet')) });
    res.json(user.contracts_with_acces);
}

usersCtrl.newContratWithAccess = async (req, res) => {
    const { contracts_with_acces } = req.body;
    await User.findOneAndUpdate({ wallet_id: decryptText(req.header('Wallet')) }, {
        $push: {
            contracts_with_acces: contracts_with_acces
        }
    });
    res.json({ message: 'contract with acces added' });
}

usersCtrl.deleteContratWithAccess = async (req, res) => {
    await User.findOneAndUpdate({ wallet_id: decryptText(req.header('Wallet')) }, {
        $pull: { contracts_with_acces: req.params.contract }
    }
    );
    res.json({ message: 'contract with acces Delete' });
}

usersCtrl.getTransactions = async (req, res) => {
    const user = await User.findOne({ wallet_id: decryptText(req.header('Wallet')) });
    res.json(user.transactions);
}
usersCtrl.newTransactions = async (req, res) => {
    const { txnHash, block, dateTime, from, to, value, txnFee } = req.body;
    await User.findOneAndUpdate({ wallet_id: decryptText(req.header('Wallet')) }, {
        $push: {
            transactions: {
                hash: txnHash,
                block: block,
                age: dateTime,
                from: from,
                to: to,
                value: value,
                txn_fee: txnFee
            }
        }
    });
    res.json({ message: 'transaction added' });
}


module.exports = usersCtrl;