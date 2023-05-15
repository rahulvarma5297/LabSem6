const mongoose = require("mongoose");

const FormdataSchema = new mongoose.Schema({
  name: String,
  address: String,
  age: String,
  state: String,
  problem: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Formdata = mongoose.model("Formdata", FormdataSchema);
module.exports = Formdata;
