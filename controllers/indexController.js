const db = require('../models/query');

exports.importData = async(req,res) => {
    const data = await db.getTrainerData();
    console.log(data)
    res.render('index',{trainers:data})
}
exports.insertData = async(req,res) => {
    const formData = req.body;
    await db.createNewTrainer(formData.text, formData.img);
    res.redirect('/'); 
}