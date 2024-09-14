const pool = require("./pool");

exports.getTrainerData = async () => {
  const { rows } = await pool.query("SELECT * FROM trainers;");
  return rows;
};
exports.getSingleTrainerData = async (index) => {
  const { rows } = await pool.query(
   `SELECT p.name,p.owner_id,p.category,p.category_id,t.trainer_name
    FROM pokemon as p
    LEFT JOIN trainers as t
    ON p.owner_id = t.trainer_id
    WHERE p.owner_id =($1)
    UNION
    SELECT k.name,k.owner_id,k.category,k.category_id, t.trainer_name
    FROM key_items as k 
    LEFT JOIN trainers as t
    ON k.owner_id = t.trainer_id
    WHERE k.owner_id = ($1)
  `, [index]
  );
return rows;
};
exports.createNewTrainer = async (name,url) => {
  await pool.query("INSERT INTO trainers (trainer_name,url) VALUES (($1),($2))", [name,url]);
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
exports.deleteTrainer = async(index) => {
  await pool.query("DELETE FROM trainers WHERE trainer_id =($1)",[index])
}
exports.updateItem = async(category,name,categoryId) => {
  await pool.query(`
    UPDATE ${category}
    SET name = ($1) 
    WHERE category_id = ($2)
    ` ,[name,categoryId]
  )
}
exports.deleteItem = async(category,index) => {
  await pool.query(`
    DELETE FROM ${category}
     WHERE category_id =($1)
     `,
     [index])
}