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
exports.createNewTrainer = async (name) => {
  await pool.query("INSERT INTO trainers (trainer_name) VALUES (($1))", [name]);
};
exports.getElementData = async (category, index) => {
  const tableName = category;
  const { rows } = await pool.query(
    "SELECT * FROM " + tableName + " WHERE category_id = ($1)",
    [index]
  );
  return rows;
};
exports.insertPokemonItem = async(tableName,item,id,category,type,level,desc,url) => {
  if(tableName =="pokemon") {
    await pool.query(
      `INSERT INTO pokemon (name, owner_id ,category,type,level,description,url)
       VALUES (($1), ($2), ($3),($4), ($5), ($6), ($7))
      `,[item,id,category,type,level,desc,url]
    )
  }
}
exports.insertKeyItem = async(tableName,item,id,category,desc,url) => {
  if(tableName=="key_items") {
    await pool.query(
      `INSERT INTO key_items (name, owner_id ,category,description,url)
       VALUES (($1), ($2), ($3),($4), ($5))
      `,[item,id,category,desc,url]
    )
  }
}
exports.deleteTrainer = async(index) => {
  await pool.query("DELETE FROM trainers WHERE trainer_id =($1)",[index])
}
exports.updatePokemonItem = async(categoryId,name,desc,url) => {
  await pool.query(`
    UPDATE pokemon
    SET name = ($1), description = ($2), url = ($3)
    WHERE category_id = ($4)
    ` ,[name,desc,url,categoryId]
  )
}
exports.updateKeyItem = async(categoryId,name,desc,url) => {
  await pool.query(`
    UPDATE key_items
    SET name = ($1), description = ($2), url = ($3)
    WHERE category_id = ($4)
    ` ,[name,desc,url,categoryId]
  )
}
exports.deleteItem = async(category,index) => {
  await pool.query(`
    DELETE FROM ${category}
     WHERE category_id =($1)
     `,
     [index])
}