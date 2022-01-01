const usersCtrl = {};

const User = require('../models/User')


usersCtrl.getUsers = async (req, res) => {
    const users = await User.find();
    res.json(users);
}

usersCtrl.getOnlyOneUser = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user);
}

usersCtrl.getAdded_tokens = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user.added_tokens);
}

usersCtrl.getFavourites_tokens = async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json(user.favourites_tokens);
}

usersCtrl.createUser = async (req, res) => {
    const { business_user, wallet_id } = req.body;
    const newUser = new User({
        wallet_id,
        business_user
    });
    await newUser.save();
    res.json({ message: 'User created' });
}

usersCtrl.deleteUser = async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'user eliminado' });
}

usersCtrl.NewTokenFavourite = async (req, res) => {
    const { token_id } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
        $push: {
            favourites_tokens: token_id
        }
    });
    res.json({ message: 'Token added to favourite' });
}

usersCtrl.deleteFavouriteToken = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
        $pull: { favourites_tokens: req.params.token }
    }
    );
    res.json({ message: 'Favourite Token Delete' });
}

usersCtrl.NewAdded_token = async (req, res) => {
    const { token_contract } = req.body;
    await User.findByIdAndUpdate(req.params.id, {
        $push: {
            added_tokens: token_contract
        }
    });
    res.json({ message: 'Token added' });
}

usersCtrl.deleteAdded_token = async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
        $pull: { added_tokens: req.params.contract }
    }
    );
    res.json({ message: 'Token Delete' });
}

module.exports = usersCtrl;