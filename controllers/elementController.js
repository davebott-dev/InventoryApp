const db = require('../models/query');

exports.importData = async(req,res)=> {
    const index = req.params.categoryId;
    const category = req.params.category;
    const data = await db.getElementData(category,index);
    res.send(data)
}