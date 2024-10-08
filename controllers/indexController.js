const db = require('../models/query');

exports.importData = async(req,res) => {
    const data = await db.getTrainerData();
    res.render('index',{trainers:data})
}
exports.insertData = async(req,res) => {
    const formData = req.body;
    await db.createNewTrainer(formData.text);
    res.redirect('/'); 
}
exports.deleteData = async(req,res) => {
    const index = req.params.trainerId;
    await db.deleteTrainer(index);
    res.redirect('/'); 
}