
let TestFunction = require('../functions/test.function');


exports.GetListbookPages = async (req, res) => {
    let res_json = await TestFunction.GetListbookPages(req.body);
    res.json(res_json);
}


exports.CreateWishlist = async (req, res) => {
    let res_json = await TestFunction.CreateWishlist(req.body);
    res.json(res_json);
}


exports.GetWishlist = async (req, res) => {
    let res_json = await TestFunction.GetWishlist(req.body);
    res.json(res_json);
}


exports.DeleteWishlist = async (req, res) => {
    let res_json = await TestFunction.DeleteWishlist(req.body);
    res.json(res_json);
}


exports.CreateUpdateRating = async (req, res) => {
    let res_json = await TestFunction.CreateUpdateRating(req.body);
    res.json(res_json);
}


exports.GetRatingOne = async (req, res) => {
    let res_json = await TestFunction.GetRatingOne(req.body);
    res.json(res_json);
}