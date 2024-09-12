const pool = require("./pool");

exports.getTrainerData = async () => {
  const { rows } = await pool.query("SELECT * FROM trainers;");
  return rows;
};
exports.getSingleTrainerData = async (index) => {
  const { rows } = await pool.query(
   `SELECT p.name,p.owner_id,p.category,p.category_id
    FROM pokemon as p
    WHERE p.owner_id =($1)
    UNION
    SELECT k.name,k.owner_id,k.category,k.category_id
    FROM key_items as k 
    WHERE k.owner_id = ($1)
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