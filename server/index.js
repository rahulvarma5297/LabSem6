const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const morgan = require("morgan");

const User = require("./Schemas/User");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

//connect to mongo
mongoose
  .connect(
    "mongodb+srv://rahulvarma5297:rahulvarma@cluster0.sgtf0nt.mongodb.net/labexam?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("MongoDb  Connected..."))
  .catch((err) => console.log(err));

// Static Files
app.use(express.static("public"));

// Morgan
const accessLogStream = fs.createWriteStream(
  path.join(__dirname, "access.log"),
  { flags: "a" }
);

app.use(morgan("combined", { stream: accessLogStream }));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  const { name, password } = req.body;
  User.findOne({ name: name, password: password }).then((user) => {
    if (user) res.status(200).json(user);
    else res.status(201).json({ msg: "failed" });
  });
});

app.post("/register", (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({
    name: name,
    email: email,
    password: password,
  });
  user.save().then((user) => {
    if (user) res.status(200).json({ msg: "success" });
    else res.status(201).json({ msg: "failed" });
  });
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads/");
  },
  filename: function (req, file, callback) {
    callback(
      null,
      Date.now() +
        Math.floor(Math.random() * 9) +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), async (req, res) => {
  User.findOneAndUpdate(
    { name: req.body.name },
    { image: "http://localhost:9000/uploads/" + req.file.filename }
  ).then((user) => {
    User.findOne({ name: req.body.name }).then((updatedUser) => {
      if (updatedUser) res.status(200).json(updatedUser);
      else res.status(201).json({ msg: "failed" });
    });
  });
});

const Formdata = require("./Schemas/Formdata");

app.post("/formdata", async (req, res) => {
  const { name, address, age, state, problem } = req.body;
  const user = await User.findOne({ name: name });

  const formdata = new Formdata({
    name: name,
    address: address,
    age: age,
    state: state,
    problem: problem,
    user: user,
  });

  formdata.save().then((formdata) => {
    if (formdata) res.status(200).json({ msg: "success" });
    else res.status(201).json({ msg: "failed" });
  });
});

app.get("/getdata/:id", async (req, res) => {
  await Formdata.find()
    .populate("user")
    .then((formdata) => {
      if (formdata) {
        const newarr = [];
        for (let i = 0; i < formdata.length; i++) {
          if (formdata[i].user.name === req.params.id) {
            newarr.push(formdata[i]);
          }
        }
        res.status(200).json(newarr);
      } else {
        res.status(201).json({ msg: "failed" });
      }
    });
});

app.delete("/delete/:id", async (req, res) => {
  await Formdata.findByIdAndDelete(req.params.id).then((formdata) => {
    if (formdata) res.status(200).json({ msg: "success" });
    else res.status(201).json({ msg: "failed" });
  });
});

app.get("/getfulldata", async (req, res) => {
  await Formdata.find()
    .populate("user")
    .then((formdata) => {
      if (formdata) res.status(200).json(formdata);
      else res.status(201).json({ msg: "failed" });
    });
});

app.listen(9000, () => {
  console.log("App Listen at 9000 for back end");
});
