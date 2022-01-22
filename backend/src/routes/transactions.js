const { Router } = require('express');
const { newTransactions, getOneTransaction, updateOneTransaction,
    getOneAdminTransaction, newAdminTransactions } = require('../controllers/transactions.controllers')

const router = Router();

router.route('/')
    .post(newTransactions)

router.route('/:idtransaction')
    .get(getOneTransaction)
    .put(updateOneTransaction)

router.route('/admin/:id')
    .post(newAdminTransactions)

router.route('/admin/:idtransaction')
    .get(getOneAdminTransaction)

module.exports = router;