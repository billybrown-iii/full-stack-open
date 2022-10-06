const mongoose = require("mongoose");

if (!process.env.PORT) {
  require("dotenv").config();
}

const uri = `mongodb+srv://link8495:${process.env.mongopw}@cluster0.twjtj.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose
  .connect(uri)
  .then(res => {
    console.log("Connected to MobgoDB");
  })
  .catch(err => {
    console.log("Err: " + err.message);
  });

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
  },
  number: {
    type: String,
    minLength: 1,
    validate: {
      validator: function (v) {
        return /^[0-9]{2,3}[-]?[0-9]{7,10}$/.test(v);
        // return false;
      },
      message: props => `${props.value} is not a valid phone number!`,
    },
    required: true,
  },
});

const Person = mongoose.model("Person", personSchema);

module.exports = Person;
