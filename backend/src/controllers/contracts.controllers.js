const contractsCtrl = {};

const Contract = require('../models/Contract')
const User = require('../models/User')
const CryptoJs = require('crypto-js')


const decryptText = (text) => {
    const bytes = CryptoJs.AES.decrypt(text, process.env.PORT || "4321")
    const textoDescifrado = bytes.toString(CryptoJs.enc.Utf8)
    return textoDescifrado.toLowerCase()
}

contractsCtrl.getContracts = async (req, res) => {
    const contracts = await Contract.find({ wallet_id: decryptText(req.header('Wallet')) });
    res.json(contracts);
}

contractsCtrl.createContract = async (req, res) => {
    const { name } = req.body;
    const newContract = new Contract({
        wallet_id: decryptText(req.header('Wallet')),
        name
    });
    await newContract.save();
    res.json({ message: 'Contract creada' });
}

contractsCtrl.getOnlyOneContract = async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (contract.wallet_id == decryptText(req.header('Wallet'))) {
            res.json(contract);
        } else {
            res.status(403).json({ mensaje: "No tienes acceso" });
        }
    } catch (error) {
        res.status(404).json({ mensaje: "no se ha encontrado el contrato" });
    }
}

contractsCtrl.updateContract = async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (contract.wallet_id == decryptText(req.header('Wallet'))) {
            const { name } = req.body
            await Contract.findByIdAndUpdate(req.params.id, {
                name
            });
            res.json({ message: 'Contract updated' });
        } else {
            res.status(403).json({ mensaje: "No tienes acceso" });
        }
    } catch (error) {
        res.status(404).json({ mensaje: "no se ha encontrado el contrato" });
    }


}

contractsCtrl.deleteContracts = async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (contract.wallet_id == decryptText(req.header('Wallet'))) {
            const contract = await Contract.findByIdAndDelete(req.params.id);
            res.json({ message: 'Contract eliminada' });
        } else {
            res.status(403).json({ mensaje: "No tienes acceso" });
        }
    } catch (error) {
        res.status(404).json({ mensaje: "no se ha encontrado el contrato" });
    }
}

contractsCtrl.getContractInfo = async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (contract.wallet_id == decryptText(req.header('Wallet'))) {
            const contracts = await Contract.findById(req.params.id);
            res.json(contracts);
        } else {
            let isUser = false;
            const user = await User.findOne({ wallet_id: decryptText(req.header('Wallet')) })
            for (let i = 0; i < user.contracts_with_acces.length; i++) {
                if (user.contracts_with_acces[i] == req.params.id) {
                    isUser = true
                }
            }
            if (isUser) {
                const contracts = await Contract.findById(req.params.id, { allowed_users: 0, wallet_id: 0 });
                res.json(contracts)
            } else {
                res.status(403).json({ mensaje: "no tienes acceso a este contrato" });
            }

        }
    } catch (error) {
        res.status(404).json({ mensaje: "no se ha encontrado el contrato" });
    }
}
/////////////

contractsCtrl.getAllowedUsers = async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (contract.wallet_id == decryptText(req.header('Wallet'))) {
            const contracts = await Contract.findById(req.params.id);
            res.json(contracts.allowed_users);
        } else {
            res.status(403).json({ mensaje: "No tienes acceso" });
        }
    } catch (error) {
        res.status(404).json({ mensaje: "no se ha encontrado el contrato" });
    }
}

contractsCtrl.createAllowedUser = async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (contract.wallet_id == decryptText(req.header('Wallet'))) {
            const { alias, wallet_id } = req.body;
            const user = await User.findOne({ wallet_id: wallet_id })
            let isDuplicated = false
            if (user) {
                for (let i = 0; i < user.contracts_with_acces.length; i++) {
                    if (user.contracts_with_acces[i] == req.params.id) {
                        isDuplicated = true
                    }
                }
                if (!isDuplicated) {
                    if (decryptText(req.header('Wallet')) != wallet_id) {
                        await User.findOneAndUpdate({ wallet_id: wallet_id }, {
                            $push: {
                                contracts_with_acces: req.params.id
                            }
                        });
                        await Contract.findByIdAndUpdate(req.params.id, {
                            $push: {
                                allowed_users: {
                                    alias: alias,
                                    wallet_id: wallet_id
                                }
                            }
                        });
                        res.json({ message: 'Allowed_users updated' });
                    } else {
                        res.status(492).json({ mensaje: "no se puede añadir tu propia wallet" });
                    }
                } else {
                    res.status(491).json({ mensaje: "no se puede añadir dos veces el mismo usuario" });
                }
            } else {
                res.status(490).json({ mensaje: "no se ha encontrado el usuario" });
            }

        } else {
            res.status(403).json({ mensaje: "No tienes acceso" });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ mensaje: "no se ha encontrado el contrato" });
    }
}

contractsCtrl.getOneAllowedUser = async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (contract.wallet_id == decryptText(req.header('Wallet'))) {
            const allowed_user = await Contract.findById(req.params.id, {
                allowed_users: {
                    $elemMatch: {
                        _id: req.params.idau
                    }
                }
            });
            res.json(allowed_user.allowed_users[0]);
        } else {
            res.status(403).json({ mensaje: "No tienes acceso" });
        }
    } catch (error) {
        res.status(404).json({ mensaje: "no se ha encontrado el contrato" });
    }
}


contractsCtrl.updateAllowedUsers = async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (contract.wallet_id == decryptText(req.header('Wallet'))) {
            const { alias } = req.body;
            await Contract.updateOne({ _id: req.params.id, allowed_users: { $elemMatch: { _id: req.params.idau } } }, {
                $set: {
                    "allowed_users.$.alias": alias,
                }
            });
            res.json({ message: 'Allowed_users updated' });
        } else {
            res.status(403).json({ mensaje: "No tienes acceso" });
        }
    } catch (error) {
        res.status(404).json({ mensaje: "no se ha encontrado el contrato" });
    }
}

contractsCtrl.deleteAllowedUsers = async (req, res) => {
    try {
        const contract = await Contract.findById(req.params.id);
        if (contract.wallet_id == decryptText(req.header('Wallet'))) {
            await Contract.findByIdAndUpdate(req.params.id, {
                $pull: { allowed_users: { _id: req.params.idau } }
            }
            );
            res.json({ message: 'Allowed_users Delete' });
        } else {
            res.status(403).json({ mensaje: "No tienes acceso" });
        }
    } catch (error) {
        console.log(error);
        res.status(404).json({ mensaje: "no se ha encontrado el contrato" });
    }
}

module.exports = contractsCtrl;