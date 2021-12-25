const { Router } = require('express');
const { getContracts, createContract, deleteContracts, getOnlyOneContract, updateContract, createAllowed_user, deleteAllowed_users, getAllowed_users, updateAllowed_users } = require('../controllers/contracts.controllers')

const router = Router();

router.route('/')
    .get(getContracts)
    .post(createContract)

router.route('/:id')
    .delete(deleteContracts)
    .get(getOnlyOneContract)
    .put(updateContract)

router.route('/alloweduser/:id')
    .put(createAllowed_user)

router.route('/alloweduser/:id/:idau')
    .delete(deleteAllowed_users)
    .get(getAllowed_users)
    .post(updateAllowed_users)

module.exports = router;