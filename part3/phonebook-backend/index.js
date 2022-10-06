const express = require("express");
const Person = require("./models/person.js");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());

// express.static() middleware defaults to serving the index.html file for get requests to “/“
app.use(express.static("build"));

const morgan = require("morgan");

app.get("/favicon.ico", (req, res) => {
  res.sendStatus(404).end();
});

app.use(
  morgan((tokens, req, res) => {
    let log = [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, "content-length"),
      "-",
      tokens["response-time"](req, res),
      "ms",
    ].join(" ");

    // if (req.method === "POST") log += " " + JSON.stringify(req.body);
    return log;
  })
);

app.get("/api/persons", (req, res) => {
  Person.find({}).then(result => {
    res.json(result);
  });
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then(result => {
      if (result) res.json(result);
      else res.status(404).end();
    })
    .catch(err => next(err));
});

app.post("/api/persons", (req, res, next) => {
  // avoid mutating the original HTTP request object, since we want morgan to log it as-is
  const newEntry = { ...req.body };

  Person.findOne({ name: newEntry.name }).then(result => {
    if (!result) {
      const newDBObj = new Person(newEntry);
      newDBObj
        .save()
        .then(result => {
          res.status(201).json(result);
        })
        .catch(err => {
          next(err);
        });
    } else {
      res.status(400).json({ message: "Entry already exists - bad request" });
    }
  });
});

app.put("/api/persons/:id", (req, res, next) => {
  const newNum = { number: req.body.number };

  Person.findByIdAndUpdate(req.params.id, newNum, { runValidators: true })
    .then(result => {
      res.status(200).end();
    })
    .catch(err => next(err));
});

app.delete("/api/persons/:id", (req, res, next) => {
  const id = req.params.id;
  Person.findByIdAndDelete(id)
    .then(result => {
      res.status(204).end();
    })
    .catch(err => next(err));
});

app.get("/info", (req, res) => {
  Person.countDocuments({}).then(result => {
    res.send(
      `<div>Phone book has info for ${result} people.</div>
    <div>Request made at ${new Date()}</div>`
    );
  });
});

// define error handler middleware for express to use when next() is called with a parameter
// app.use() must be at the end
// ---
// note - all route handlers are basically middleware
// the client request bubbles through all middleware
const errorHandler = (err, req, res, next) => {
  // console.log("I'm a middleware!");
  // console.log(JSON.stringify(err));

  // note about CastError:
  // If you use an id that no longer exists, you get the predictable "null"
  // if you use a malformed id like "abc123" that would never be a mongoose id, you'll get a CastError.
  if (err.name === "CastError") {
    return res.status(400).json({ message: "malformed id" });
  }
  if (err.name === "ValidatorError" || err.name === "ValidationError") {
    return res.status(400).json({ name: "ValidatorError", message: err.message });
  }
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
