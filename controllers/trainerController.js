const db = require("../models/query");

exports.importData = async (req, res) => {
  const index = req.params.trainerId;
  const data = await db.getSingleTrainerData(index);
  res.render("trainer", { trainerData: data, index: index });
};
exports.insertData = async (req, res) => {
  if (req.body.categories === "pokemon") {
    const category = req.body.categories;
    const name = req.body.name;
    const type = req.body.type;
    const level = req.body.level;
    const desc = req.body.desc;
    const url = req.body.url;
    const index = req.params.trainerId;
    await db.insertPokemonItem(
      category,
      name,
      index,
      category,
      type,
      level,
      desc,
      url
    );
    res.redirect(`/trainer/${index}`);
  } else {
    const category = req.body.categories;
    const name = req.body.name;
    const desc = req.body.desc;
    const url = req.body.url;
    const index = req.params.trainerId;
    await db.insertKeyItem(category, name, index, category, desc, url);
    res.redirect(`/trainer/${index}`);
  }
};
exports.updateDataGet = async (req, res) => {
  const trainerId = req.params.trainerId;
  const category = req.params.category;
  const categoryId = req.params.categoryId;
  res.render("update", {
    title: "Update Form",
    trainerId: trainerId,
    category: category,
    categoryId: categoryId,
  });
};
exports.updateDataPost = async (req, res) => {
  if (req.params.category == "pokemon") {
    const index = req.params.trainerId;
    const name = req.body.name;
    const desc = req.body.desc;
    const url = req.body.url;
    const categoryId = req.params.categoryId;
    await db.updatePokemonItem(categoryId, name, desc, url);
    res.redirect(`/trainer/${index}`);
  } else {
    const index = req.params.trainerId;
    const name = req.body.name;
    const desc = req.body.desc;
    const url = req.body.url;
    const categoryId = req.params.categoryId;
    await db.updateKeyItem(categoryId, name, desc, url);
    res.redirect(`/trainer/${index}`);
  }
};
exports.deleteData = async (req, res) => {
  const index = req.params.trainerId;
  const category = req.params.category;
  const categoryId = req.params.categoryId;
  await db.deleteItem(category, categoryId);
  res.redirect(`/trainer/${index}`);
};
