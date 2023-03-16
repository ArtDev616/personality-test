const db = require("../config/db");

const getAllQuestions = (req, res) => {
  const sql = `SELECT pq.id, pq.content as question, json_group_array(json_object('id', pa.id, 'answer', pa.content, 'score', pa.score)) as answers FROM personality_questions as pq JOIN personality_answers as pa ON pq.id = pa.question_id GROUP BY pq.id`;

  db.all(sql, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send("Internal server error");
    } else if (!rows) {
      res.status(400).send("Invalid score");
    } else {
      res.json({ status: "ok", message: "success", questions: rows });
    }
  });
};

module.exports = {
  getAllQuestions
};
