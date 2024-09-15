const db = require("../models/query");

exports.importData = async (req, res) => {
  const index = req.params.trainerId;

  res.render('add',{title:'Add Item Form', index:index});
};