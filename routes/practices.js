const express = require("express");
const router = express.Router();
const Practice = require("../models/Practice");
const mongoose = require("mongoose");

/* get all practices in the database */
router.get("/", (req, res) => {
  Practice.find()
    .then(practices => {
      res.json(practices);
    })
    .catch(err => {
      res.json(err);
    });
});

/* get all practices saved by user*/
router.get("/saved", (req, res) => {
  const user = req.user._id.toString();
  let ownerArray = [];
  let savedPractices = [];
  Practice.find({ owner: { $all: [req.user._id] } })
    .then(response => {
      res.json(response);
    })
    .catch(err => {
      res.json(err);
    });
});

/* get one practice */
router.get("/:id", (req, res) => {
  Practice.findById(req.params.id)
    .then(practice => {
      if (!practice) {
        res.status(404).json(practice);
      } else {
        res.json(practice);
      }
    })
    .catch(err => {
      res.json(err);
    });
});

/* search for practice by name */
router.get("/search/:query", (req, res) => {
  if (!req.params.query) {
    Practice.find()
      .then(practices => {
        res.json(practices);
      })
      .catch(err => {
        res.json(err);
      });
  } else {
    Practice.find({ name: new RegExp(req.params.query, "i") })
      .then(practices => {
        res.json(practices);
      })
      .catch(err => {
        res.json(err);
      });
  }
});

/* create new practice */
router.post("/", (req, res) => {
  const {
    name,
    type,
    street,
    city,
    zip,
    phone
    // monday,
    // tuesday,
    // wednesday,
    // thursday,
    // friday
  } = req.body;
  const owner = req.user._id;
  return Practice.create({
    owner,
    name,
    type,
    address: { street, city, zip },
    phone
    // hours: { monday, tuesday, wednesday, thursday, friday }
  })
    .then(dbPractice => {
      res.json({ dbPractice });
    })
    .catch(err => {
      res.json(err);
    });
});

/* edit practice */
router.put("/:id", (req, res) => {
  const {
    name,
    type,
    street,
    city,
    zip,
    phone
    // monday,
    // tuesday,
    // wednesday,
    // thursday,
    // friday
  } = req.body;
  //   const { owner } = req.user._id;
  //   const { practice } = req.practice._id;
  //   const { series } = req.series._id;
  //const user = "5d970457bd3113da6a822ca8";
  Practice.findByIdAndUpdate(
    req.params.id,
    {
      //owner,
      name,
      type,
      address: { street, city, zip },
      phone
      // hours: { monday, tuesday, wednesday, thursday, friday }
    },
    // { new: true } ensures that we are getting the updated document in the .then callback
    { new: true }
  )
    .then(updatedAppointment => {
      return res.json(updatedAppointment);
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

/* remove practice from user's saved list */
router.put("/removeOwner/:id", (req, res) => {
  console.log(req.user._id);
  Practice.findByIdAndUpdate(
    req.params.id,
    { $pull: { owner: req.user._id } },
    { new: true }
  )
    .then(updatedPractice => {
      console.log(updatedPractice);
      return res.json({
        message: `${updatedPractice.name} has been removed from your saved list`
      });
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

/* Add practice to user's saved list */
router.put("/addOwner/:id", (req, res) => {
  console.log(req.user._id);
  Practice.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { owner: req.user._id } },
    { new: true }
  )
    .then(updatedPractice => {
      console.log(updatedPractice);
      return res.json({
        message: `${updatedPractice.name} has been added to your saved list`
      });
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

/* delete practice */
/* NOT ALLOWED FOR NOW */

module.exports = router;
