const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");
const mongoose = require("mongoose");

/* get all appointments */
router.get("/", (req, res) => {
  Appointment.find({ owner: req.user._id })
    .then(appointments => {
      res.json(appointments);
    })
    .catch(err => {
      res.json(err);
    });
});

/* get one appt */
router.get("/:id", (req, res) => {
  Appointment.findById(req.params.id)
    .then(appointment => {
      if (!appointment) {
        res.status(404).json(appointment);
      } else if (appointment.owner.toString() !== req.user._id.toString()) {
        res
          .status(300)
          .json({ message: "You do not have access to this appointment" });
      } else {
        res.json(appointment);
      }
    })
    .catch(err => {
      res.json(err);
    });
});

/* create new appt */
router.post("/", (req, res) => {
  const { type, date } = req.body;
  const owner = req.user._id;
  //   const { practice } = req.practice._id;
  //   const { series } = req.series._id;
  return Appointment.create({
    type,
    date,
    owner
    // practice,
    // series
  })
    .then(dbAppointment => {
      res.json({ dbAppointment });
    })
    .catch(err => {
      res.json(err);
    });
});

/* edit appt */
router.put("/:id", (req, res) => {
  const { type, date } = req.body;
  //   const { owner } = req.user._id;
  //   const { practice } = req.practice._id;
  //   const { series } = req.series._id;
  //const user = "5d970457bd3113da6a822ca8";
  Appointment.findById(req.params.id)
    .then(appointment => {
      if (!appointment) {
        res.status(404).json(appointment);
      } else if (appointment.owner.toString() !== req.user._id.toString()) {
        res
          .status(300)
          .json({ message: "You do not have access to this appointment" });
      } else {
        console.log("Update One");
        return Appointment.findByIdAndUpdate(
          req.params.id,
          { type, date },
          //   , owner, practice, series },
          // { new: true } ensures that we are getting the updated document in the .then callback
          { new: true }
        ).then(updatedAppointment => {
          return res.json(updatedAppointment);
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.json(err);
    });
});

/* delete appt */
router.delete("/:id", (req, res) => {
  Appointment.findById(req.params.id)
    .then(appointment => {
      if (!appointment) {
        res.status(404).json(appointment);
      } else if (appointment.owner.toString() !== req.user._id.toString()) {
        console.log(appointment.owner, req.user._id);
        console.log(typeof appointment.owner, typeof req.user._id);

        res
          .status(300)
          .json({ message: "You do not have access to this appointment" });
      } else {
        return Appointment.deleteOne(appointment).then(() => {
          return res.json({ message: "Appointment successfully deleted" });
        });
      }
    })
    .catch(err => {
      res.json(err);
    });
  //   Appointment.findByIdAndDelete(req.params.id)
  //     .then(() => {
  //       return res.json({ message: "Appointment successfully deleted" });
  //     })
  //     .catch(err => {
  //       res.json(err);
  //     });
});

module.exports = router;
