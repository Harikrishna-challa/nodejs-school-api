const express = require("express");
const dotenv = require("dotenv");
const schoolRoutes = require("./routes/schoolRoutes");

dotenv.config();
const app = express();
app.use(express.json());

// Debug middleware: Log each request
app.use((req, res, next) => {
  console.log(`[DEBUG] ${req.method} ${req.url}`);
  next();
});

app.use("/", schoolRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
