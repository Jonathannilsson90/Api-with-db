require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
//Middleware declaration
const helmet = require("helmet");
const cors = require("cors");
const jwt = require("jsonwebtoken");

//Middleware start-up
app.use(helmet());
app.use(cors());
app.use(express.json());

const bookRouter = require("./routes/bookRoutes");
app.use("/books", verifyToken, bookRouter);

const userRouter = require("./routes/apiUsersRoutes");
app.use("/api-users", userRouter);

function verifyToken(req, res, next) {
  const bearer = req.headers["authorization"];
  const token = bearer && bearer.split(" ")[1];

  if (!token) {
    return res.status(401);
  }
  jwt.verify(token, process.env.ACCESS_SECRET_TOKEN, (error, user) => {
    if (error) {
      return res.status(403);
    }

    next();
  });
}

mongoose.set("strictQuery", false);
mongoose.connect(process.env.DB_URL, () => console.log("DB connected"));

app.listen(port, () => console.log(`Server started on port ${port}`));
