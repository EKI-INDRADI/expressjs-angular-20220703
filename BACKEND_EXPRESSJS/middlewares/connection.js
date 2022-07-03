exports.mongodb = function () {

  const db = require("../models");
  const dbConfig = require("./config/db.config");

  // let connectionString = `mongodb://eki:ekitesting@localhost:27017/EKI_INDRADI?authSource=eki_indradi_test`
  // let connectionString = `mongodb://${dbConfig.USERNAME}:${dbConfig.PASSWORD}@${dbConfig.DB_HOST}:${dbConfig.DB_PORT}/${dbConfig.DB}?authSource=${dbConfig.DB}`

 let connectionString = `mongodb://${dbConfig.DB_HOST}:27017/${dbConfig.DB}` // for localhost

  // let connectionString = `mongodb://${dbConfig.DB_USERNAME}:${dbConfig.DB_PASSWORD}@%2Fhome%2Fekimyid%2Fmongodb-0.sock/${dbConfig.DB}` // domainesia

  // let connectionString = `mongodb://ekimyid:xXxMasuk123@%2Fhome%2Fekimyid%2Fmongodb-0.sock/eki_indradi_test`  // domainesia


  db.mongoose
    .connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => {
      console.log("Successfully connect to MongoDB.");
      // ===================================== JWT MODULE - ADMIN ROLE

      // ===================================== JWT MODULE - ADMIN ROLE
    })
    .catch(err => {
      console.error("Connection error", err);
      process.exit();
    });
}