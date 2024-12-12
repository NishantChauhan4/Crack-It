const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://nishantchauhan44442:Wb3PJC8DTqmpkaC3@cluster0.znq3zfn.mongodb.net/crackit"
  )
  .then(() => {
    console.log("Database has been connected");
  })
  .catch((e) => {
    console.log(e);
  });
