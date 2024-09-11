const pool = require("./pool");

exports.getTrainerData = async () => {
  const { rows } = await pool.query("SELECT * FROM trainers;");
  return rows;
};
exports.getSingleTrainerData = async (index) => {
  const { rows } = await pool.query(
   `SELECT trainer_name,trainer_id,p.category_id as pokemon_id,p.name as pokemon_name,
    p.category as pokemon_category,k.name as key_item_name,k.category as key_item_category,
    k.owner_id as key_item_category_id FROM trainers as t 
    LEFT JOIN pokemon as p ON t.trainer_id = p.owner_id 
    LEFT JOIN key_items as k ON p.owner_id = k.owner_id 
    WHERE t.trainer_id = ($1)
  `, [index]
  );
return rows;
};
exports.createNewTrainer = async (name) => {
  await pool.query("INSERT INTO trainers (trainer_name) VALUES ($1)", [name]);
};
exports.getElementData = async (category, index) => {
  const tableName = category;
  const { rows } = await pool.query(
    "SELECT * FROM " + tableName + " WHERE category_id = ($1)",
    [index]
  );
  return rows;
};

exports.insertItem = async(tableName,item,id,category) => {
  await pool.query(
    `INSERT INTO ${tableName} (name, owner_id ,category)
     VALUES (($1), ($2), ($3))
    `,[item,id,category]
  )
}