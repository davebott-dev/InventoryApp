const db = require("../models/query");

exports.importData = async (req, res) => {
  const index = req.params.trainerId;
  const data = await db.getSingleTrainerData(index);
  res.render("trainer", { trainerData: data, index:index});
};
exports.insertData = async(req,res)=> {
  const category = req.body.categories;
  const name = req.body.categoryItem;
  const index = req.params.trainerId;

  await db.insertItem(category,name,index,category)

  res.redirect(`/trainer/${index}`);
  
}