const express = require("express");
const router = express.Router();
const db = require("../db");
const { addSchool, listSchools } = require("../controllers/schoolsController");

// POST /addSchool
router.post("/addSchool", (req, res) => {
    const { name, address, phone, email, website } = req.body;
  
    const sql = "INSERT INTO schools (name, address, phone, email, website) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [name, address, phone, email, website], (err, result) => {
      if (err) {
        console.error("❌ Database error:", err);  // Print full error here
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "School added successfully" });
    });
  });
  

// GET /listSchools
router.get("/listSchools", (req, res) => {
  const userLat = parseFloat(req.query.latitude);
  const userLong = parseFloat(req.query.longitude);

  if (!userLat || !userLong) {
    return res.status(400).json({ error: "Latitude and Longitude are required" });
  }

  db.query("SELECT * FROM schools", (err, schools) => {
    if (err) return res.status(500).json({ error: "Database error" });

    const toRad = (value) => (value * Math.PI) / 180;

    const sortedSchools = schools.map((school) => {
      const dLat = toRad(school.latitude - userLat);
      const dLong = toRad(school.longitude - userLong);
      const a =
        Math.sin(dLat / 2) ** 2 +
        Math.cos(toRad(userLat)) * Math.cos(toRad(school.latitude)) * Math.sin(dLong / 2) ** 2;
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = 6371 * c; // Radius of Earth in km
      return { ...school, distance };
    }).sort((a, b) => a.distance - b.distance);

    res.json(sortedSchools);
  });
});

module.exports = router;
