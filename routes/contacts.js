const router = require('express').Router();
const { getAll, getOne, create, update, remove } = require('../controllers/contactsController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', auth, upload, create);
router.put('/:id', auth, upload, update);
router.delete('/:id', auth, remove);

module.exports = router;
