
let express = require('express');
let router = express.Router();
let controller = require('../controller/test.controller')

router.get('/', function (req, res) {
    console.log('TEST SERVICES V1 IS RUNNING!');
    res.json({ statusCode: 1, message: 'TEST SERVICES V1 IS RUNNING!' });
});

router.use('/get-list-book-pages', controller.GetListbookPages);
router.use('/create-wishlist', controller.CreateWishlist);
router.use('/get-wishlist', controller.GetWishlist);
router.use('/delete-wishlist', controller.DeleteWishlist);
router.use('/create-update-rating', controller.CreateUpdateRating);

module.exports = router;
