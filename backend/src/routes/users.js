const { Router } = require('express');
const { getUsers, createUser, deleteUser, getOnlyOneUser, NewTokenFavourite, deleteFavouriteToken, NewAdded_token, deleteAdded_token, getAdded_tokens, getFavourites_tokens } = require('../controllers/users.controllers')

const router = Router();

router.route('/')
    .get(getUsers)
    .post(createUser)

router.route('/:id')
    .delete(deleteUser)
    .get(getOnlyOneUser)
    .put(NewTokenFavourite)

router.route('/:id/:token')
    .delete(deleteFavouriteToken)

router.route('/othertoken/:id/:contract')
    .delete(deleteAdded_token)

router.route('/othertoken/:id/')
    .put(NewAdded_token)

router.route('/addedtokens/:id/')
    .get(getAdded_tokens)

router.route('/favouritestokens/:id/')
    .get(getFavourites_tokens)

module.exports = router;