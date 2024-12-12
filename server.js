const express = require("express");
const router = require("./routes/routes");
require("./utils/dbConnect");
const cookieParser = require("cookie-parser");

const app = express();

app.use("/public", express.static("public"));
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/", router);

const PORT = 8082;

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
