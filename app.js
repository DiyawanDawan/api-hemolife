require("dotenv").config();

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require('cors');
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const loginRouter = require("./routes/login");
const registerRouter = require("./routes/register");
const profileRouter = require("./routes/profile");
const adminRouter = require("./routes/admin");
const jadwalRouter = require("./routes/jadwal");
const volunteerRouter = require("./routes/volunteer");
const dashboardRouter = require("./routes/dashboard");
const blogsRouter = require("./routes/bloges");
// const  addPostJadwalPMI = require("./routes/addPostJawadlDonorPMI");

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/v1/auth/login", loginRouter);
app.use("/v1/auth/register", registerRouter);
app.use("/v1/user/userProfile", profileRouter);
app.use("/v1/admin", adminRouter);
// app.use("/v1/admin/", addPostJadwalPMI);
app.use("/v1/user/jadwal", jadwalRouter);
app.use("/v1/blogs", blogsRouter)
app.use("/v1/user/volunteer", volunteerRouter);
app.use("/v1/user/dashboardUser", dashboardRouter);

module.exports = app;
