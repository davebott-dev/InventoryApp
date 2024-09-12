const db = require("../models/query");

exports.importData = async (req, res) => {
  const index = req.params.trainerId;
  const data = await db.getSingleTrainerData(index);

  res.render('add',{title:'Add Item Form', data:data, index:index});
};