const fs = require("fs")
const path = require("path")
const dbPath = path.join(__dirname, "../../data/db.json");
const { faker } = require('@faker-js/faker');


module.exports.randomUser = (req, res) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }

    try {
      const jsonData = JSON.parse(data);
      const randomIndex = Math.floor(Math.random() * jsonData.length);
      res.json(jsonData[randomIndex]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })
}
module.exports.createFakeUser = (req, res, next) => {
  fs.readFile(dbPath, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
    try {
      const genders = ["male", "female"];
      const randomGender = genders[Math.floor(Math.random() * genders.length)];

      const jsonData = JSON.parse(data);
      const fakeData = {
        id: jsonData.length + 1,
        name: faker.internet.userName(),
        gender: genders[randomGender],
        contact: faker.phone.number(),
        address: faker.location.streetAddress(),
        photoUrl: faker.image.avatar()
      }
      jsonData.push(fakeData);
      fs.writeFile(dbPath, JSON.stringify(jsonData), err => {
        if (err) {
          console.error(err);
          res.status(500).json({ success: false, message: "Internal Server Error" });
        }
        res.json({ success: true, message: "Fake user created successfully", data: fakeData })
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Internal Server Error" })
    }
  })
}