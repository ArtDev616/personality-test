const sqlite3 = require("sqlite3").verbose();

// Create a new database instance
const db = new sqlite3.Database("./config/personality-test.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the personality test database.");
  }
});

// Create the SQLite database table to store the personality traits
db.serialize(() => {
  db.run("DROP TABLE IF EXISTS personality_traits");
  db.run("DROP TABLE IF EXISTS personality_questions");
  db.run("DROP TABLE IF EXISTS personality_answers");

  db.run(
    "CREATE TABLE IF NOT EXISTS personality_traits (id INTEGER PRIMARY KEY, name TEXT, score INTEGER)"
  );
  db.run("INSERT INTO personality_traits (name, score) VALUES (?, ?)", [
    "Introvert",
    1,
  ]);
  db.run("INSERT INTO personality_traits (name, score) VALUES (?, ?)", [
    "Extrovert",
    2,
  ]);

  db.run(
    "CREATE TABLE IF NOT EXISTS personality_questions (id INTEGER PRIMARY KEY, content TEXT)"
  );
  db.run("INSERT INTO personality_questions (content) VALUES (?)", [
    "You’re really busy at work and a colleague is telling you their life story and personal woes. You:",
  ]);
  db.run("INSERT INTO personality_questions (content) VALUES (?)", [
    "You’ve been sitting in the doctor’s waiting room for more than 25 minutes. You:",
  ]);
  db.run("INSERT INTO personality_questions (content) VALUES (?)", [
    "You’re having an animated discussion with a colleague regarding a project that you’re in charge of. You:",
  ]);

  db.run(
    "CREATE TABLE IF NOT EXISTS personality_answers (id INTEGER PRIMARY KEY, question_id INTEGER, content TEXT, score INTEGER, FOREIGN KEY(question_id) REFERENCES personality_questions(id))"
  );
  db.run(
    "INSERT INTO personality_answers (question_id, content, score) VALUES (?, ?, ?)",
    [1, "Don’t dare to interrupt them", 1]
  );
  db.run(
    "INSERT INTO personality_answers (question_id, content, score) VALUES (?, ?, ?)",
    [1, "Interrupt and explain that you are really busy at the moment", 2]
  );
  db.run(
    "INSERT INTO personality_answers (question_id, content, score) VALUES (?, ?, ?)",
    [2, "Bubble with inner anger, but keep quiet", 1]
  );
  db.run(
    "INSERT INTO personality_answers (question_id, content, score) VALUES (?, ?, ?)",
    [2, "Look at your watch every two minutes", 2]
  );
  db.run(
    "INSERT INTO personality_answers (question_id, content, score) VALUES (?, ?, ?)",
    [3, "Don’t dare contradict them", 1]
  );
  db.run(
    "INSERT INTO personality_answers (question_id, content, score) VALUES (?, ?, ?)",
    [3, "Continuously interrupt your colleague", 2]
  );
});

module.exports = db;
