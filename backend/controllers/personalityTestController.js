const db = require("../config/db");

const submitPersonalityTest = (req, res) => {
  const { score } = req.body;

  const sql = `SELECT * FROM personality_traits WHERE score = ?`;

  db.get(sql, [score], (err, row) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    } else if (!row) {
      res.status(400).send("Invalid score");
    } else {
      res.json({ status: "ok", message: "success", personality: row.name });
    }
  });
};

module.exports = {
  submitPersonalityTest
};