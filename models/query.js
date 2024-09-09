const pool = require("./pool");

exports.getTrainerData = async () => {
  const { rows } = await pool.query(
    "SELECT * FROM trainers;"
  );
  return rows;
};
exports.getSingleTrainerData = async (index) => {
    const {rows} =await pool.query (
        "SELECT * FROM trainers as t FULL JOIN pokemon as p ON t.trainer_id = p.owner_id WHERE t.trainer_id = ($1)",[index]
    );
    return rows;
}
exports.createNewTrainer = async (name) => {
    await pool.query(
        "INSERT INTO trainers (trainer_name) VALUES ($1)", [name]
    );
}

