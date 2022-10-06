const mongoose = require("mongoose");

if (!process.argv[2]) console.log("Missing pw");

const uri = `mongodb+srv://link8495:${process.argv[2]}@cluster0.twjtj.mongodb.net/?retryWrites=true&w=majority`;

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (process.argv.length === 3) {
  mongoose
    .connect(uri)
    .then(res => {
      return Person.find({});
    })
    .then(res => {
      res.forEach(person => console.log(`${person.name} ${person.number}`));
    })
    .then(() => mongoose.connection.close());
}

if (process.argv.length === 5) {
  mongoose
    .connect(uri)
    .then(res => {
      const newEntry = new Person({ name: process.argv[3], number: process.argv[4] });
      return newEntry.save();
    })
    .then(res => {
      console.log(res);
      mongoose.connection.close();
    });
}

// const ex1 = new Person({
//   name: "Fredfred",
//   number: "Insert Fredfred's number here.",
// });
// const ex2 = new Person({
//   name: "Fredfred2",
//   number: "Insert Fredfred2's number here.",
// });
// const ex3 = new Person({
//   name: "Fredfred3",
//   number: "Insert Fredfred3's number here.",
// });

// mongoose
//   .connect(uri)
//   .then(result => {
//     // console.log(result);
//     return ex1.save();
//   })
//   .then(res => {
//     return ex2.save();
//   })
//   .then(res => {
//     return ex3.save();
//   })
//   .then(res => {
//     console.log(res);
//     console.log("Closing!");
//     mongoose.connection.close();
//   });
