const mongoose = require("mongoose");
const faker = require('Faker');
const bcrypt = require("bcrypt");
const User = require("../models/User");
const Appointment = require("../models/Appointment");
const Practice = require("../models/Practice");
const Series = require("../models/Series");

const bcryptSalt = 10;
mongoose
  .connect('mongodb://localhost/server', {useNewUrlParser: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });

let userData = {
    username: "alice",
    password: bcrypt.hashSync("alice", bcrypt.genSaltSync(bcryptSalt)),
};

const seed = async () => {
    try {
      await User.deleteMany();
      await Series.deleteMany();
      await Appointment.deleteMany();
      await Practice.deleteMany();
      
      const practiceTypes = ['Dentist', 'Orthopedist', 'General physician'];
      const user = await User.create(userData);

      const practices = await [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(async () => {
        await Practice.create({
          owner: user._id,
          name: faker.company.companyName(),
          address: {
              street: faker.address.streetAddress(),
              city: faker.address.city(),
              zip: faker.address.zipCode()
          },
          phone: faker.phone.phoneNumber(),
          type: practiceTypes[Math.floor(Math.random() * practiceTypes.length)],
          hours: {
            monday: '8.00 - 16.00',
            tuesday: '8.00 - 16.00',
            wednesday: '8.00 - 12.00',
            thursday: '8.00 - 16.00',
            friday: '8.00 - 16.00'
           }
        });
      });
      await Promise.all(practices); 
      
      const seriesTypes = ['Dental Cleaning', 'Vaccination', 'Head-MRT']; 
      const frequencies = [2, 0.1, 1];
      const series = seriesTypes.map(async (v, i) => {
        await Series.create({
          owner: user._id,
          type: seriesTypes[i],
          frequency: frequencies[i],
          practice: practices[Math.floor(Math.random() * practices.length)]._id 
        }) 
      });
      await Promise.all(series);
    
      const appointmentTypes = ['Check up', 'Vaccination', 'Dental Cleaning', 'Surgery'];
      const appointments = await [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map(async () => {
          await Appointment.create({
            owner: user._id,
            type: appointmentTypes[Math.floor(Math.random() * appointmentTypes.length)],
            date: faker.date.between('2019-10-10', '2019-12-31'),
            practice: practices[Math.floor(Math.random() * practices.length)]._id,
            series: series[Math.floor(Math.random() * series.length)]._id 
          })
      });
      await Promise.all(appointments);
      console.log('Database successfully seeded');
      mongoose.disconnect();
      console.log('Database connection closed');
    } catch(err) {
        console.log('Error at seeding database', err);
        mongoose.disconnect()
    }
}

seed();