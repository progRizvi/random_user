const express = require('express');
const cors = require('cors');
const app = express();
const userRouter = require('./routes/api/v1/userRoutes.js');
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the API",
    data: __dirname
  })
})
app.all("*", (req, res) => {
  res.status(404).json({
    "success": false,
    "message": "Page not found"
  })
})

app.listen(port, () => {
  console.log(`Server is running at port http://localhost:${port}`);
})
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
  process.exit(1)
})