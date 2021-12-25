const contractsCtrl = {};

const Contract = require('../models/Contract')

//Contracts

contractsCtrl.getContracts = async (req, res) => {
    const contracts = await Contract.find();
    res.json(contracts);
}

contractsCtrl.getOnlyOneContract = async (req, res) => {
    const contracts = await Contract.findById(req.params.id);
    res.json(contracts);
}

contractsCtrl.createContract = async (req, res) => {
    const { contract_id, wallet_id, name } = req.body;
    const newContract = new Contract({
        contract_id,
        wallet_id,
        name
    });
    await newContract.save();
    res.json({ message: 'Contract creada' });
}

contractsCtrl.updateContract = async (req, res) => {
    const { name, allowed_users } = req.body
    await Contract.findByIdAndUpdate(req.params.id, {
        name,
        allowed_users
    });
    res.json({ message: 'Contract updated' });
}

contractsCtrl.deleteContracts = async (req, res) => {
    const contract = await Contract.findByIdAndDelete(req.params.id);
    res.json({ message: 'Contract eliminada' });
}

//Allowed users

contractsCtrl.getAllowed_users = async (req, res) => {
    const allowed_user = await Contract.findById(req.params.id, {
        allowed_users: {
            $elemMatch: {
                _id: req.params.idau
            }
        }
    });
    res.json(allowed_user.allowed_users[0]);
}

contractsCtrl.createAllowed_user = async (req, res) => {
    const { alias, wallet_id } = req.body;
    await Contract.findByIdAndUpdate(req.params.id, {
        $push: {
            allowed_users: {
                alias,
                wallet_id
            }
        }
    });
    res.json({ message: 'Allowed_users updated' });
}

contractsCtrl.updateAllowed_users = async (req, res) => {
    const { alias, wallet_id } = req.body;
    await Contract.updateOne({ _id: req.params.id, allowed_users: { $elemMatch: { _id: req.params.idau } } }, {
        $set: {
            "allowed_users.$.alias": alias,
            "allowed_users.$.wallet_id": wallet_id
        }
    });
    res.json({ message: 'Allowed_users updated' });
}

contractsCtrl.deleteAllowed_users = async (req, res) => {
    await Contract.findByIdAndUpdate(req.params.id, {
        $pull: { allowed_users: { _id: req.params.idau } }
    }
    );
    res.json({ message: 'Allowed_users Delete' });
}


module.exports = contractsCtrl;