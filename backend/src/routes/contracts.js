const { Router } = require('express');
const { getContracts, createContract, deleteContracts, getOnlyOneContract, updateContract, getContractInfo,
    createAllowedUser, getAllowedUsers, deleteAllowedUsers, getOneAllowedUser, updateAllowedUsers, newTransactions, getAdminContractInfo } = require('../controllers/contracts.controllers')

const router = Router();

router.route('/')
    .get(getContracts)
    .post(createContract)

router.route('/:id')
    .get(getOnlyOneContract)
    .put(updateContract)
    .delete(deleteContracts)

router.route('/admin/contractinfo/:id')
    .get(getAdminContractInfo)

router.route('/contractinfo/:id')
    .get(getContractInfo)

router.route('/alloweduser/:id')
    .get(getAllowedUsers)
    .put(createAllowedUser)

router.route('/alloweduser/:id/:idau')
    .get(getOneAllowedUser)
    .post(updateAllowedUsers)
    .delete(deleteAllowedUsers)

router.route('/transactions/:id')
    .put(newTransactions)

module.exports = router;