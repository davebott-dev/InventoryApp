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
exports.updateDataGet = async (req, res) => {
  const trainerId = req.params.trainerId;
  const category = req.params.category;
  const categoryId = req.params.categoryId;
  res.render("update", { title: "Update Form", trainerId:trainerId, 
    category:category, categoryId:categoryId});
};
exports.updateDataPost = async (req, res) => {
  const index = req.params.trainerId;
  const name = req.body.name;
  const category = req.params.category;
  const categoryId = req.params.categoryId;
  const data = await db.updateItem(category,name,categoryId);
  res.redirect(`/trainer/${index}`);
};
exports.deleteData = async (req, res) => {
  const index = req.params.trainerId;
  const category = req.params.category;
  const categoryId = req.params.categoryId;
  await db.deleteItem(category,categoryId);
  res.redirect(`/trainer/${index}`);
};