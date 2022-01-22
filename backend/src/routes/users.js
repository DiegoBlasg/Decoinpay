const { Router } = require('express');
const { createUser, getOnlyOneUser, newFavouriteToken, deleteFavouriteToken,
    newAdded_token, getAdded_tokens, deleteAdded_token, getFavouritesTokens, newContratWithAccess, getContratWithAccess,
    deleteContratWithAccess, getTransactions, newTransactions } = require('../controllers/users.controllers')

const router = Router();

router.route('/')
    .get(getOnlyOneUser)
    .post(createUser)

router.route('/favouritetoken')
    .get(getFavouritesTokens)
    .put(newFavouriteToken)

router.route('/favouritetoken/:token')
    .delete(deleteFavouriteToken)

router.route('/addedtoken')
    .get(getAdded_tokens)
    .put(newAdded_token)

router.route('/addedtoken/:contract')
    .delete(deleteAdded_token)

router.route('/contratwithaccess')
    .get(getContratWithAccess)
    .put(newContratWithAccess)

router.route('/contratwithaccess/:contract')
    .delete(deleteContratWithAccess)

router.route('/transactions')
    .get(getTransactions)
    .put(newTransactions)

module.exports = router;