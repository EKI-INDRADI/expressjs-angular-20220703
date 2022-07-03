
let auth_function = require('../functions/auth.function');


exports.getToken = async (req, res) => {
    let res_json = await auth_function.getToken(req.body);
    res.json(res_json);
}



