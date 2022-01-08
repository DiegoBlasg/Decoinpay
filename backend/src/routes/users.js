const { Router } = require('express');
const { getUsersAdmin, getOnlyOneUserAdmin, createUser, getOnlyOneUser, deleteUser, newFavouriteToken, deleteFavouriteToken,
    newAdded_token, getAdded_tokens, deleteAdded_token, getFavouritesTokens, newContratWithAccess, getContratWithAccess,
    deleteContratWithAccess, getTransactions } = require('../controllers/users.controllers')

const router = Router();

router.route('/admin')
    .get(getUsersAdmin)

router.route('/admin/:wallet')
    .get(getOnlyOneUserAdmin)

router.route('/')
    .get(getOnlyOneUser)
    .post(createUser)
//.delete(deleteUser)

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

module.exports = router;