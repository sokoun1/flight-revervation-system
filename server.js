const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoute");
const { errorHandler } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/flights", require("./routes/flightRoutes"));
app.use(errorHandler);

mongoose
  .connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Connection error", err.message);
  });
