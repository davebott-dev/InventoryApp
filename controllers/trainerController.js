const db = require("../models/query");

exports.importData = async (req, res) => {
  const index = req.params.trainerId;
  const data = await db.getSingleTrainerData(index);

  res.render("trainer", { trainerData: data});
};
exports.insertData = async(req,res)=> {
  const category = req.body.category;
  const name = req.body.categoryItem;
  const index = req.params.categoryId;

  res.send(`category:${category}`)
  
}