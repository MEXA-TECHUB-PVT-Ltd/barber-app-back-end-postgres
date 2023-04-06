
const express = require('express');
const app = express();
const dbConfig = require('./app/config/db.config')

const PORT = process.env.PORT || 3000;
const bodyParser = require('body-parser');
require('dotenv').config()
// const auth = require('./middlewares/auth')


// app.use("/barber_profile_images" , express.static("barber_profile_images"))
// app.use("/hairStyles" , express.static("hairStyles"))
// app.use("/admin_profile_images" , express.static("admin_profile_images"))

const cors = require("cors");

app.use(cors({
    methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
  }));
  

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json())

app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));
// const demo = require('./app/controllers/demo')



 app.use("/admin" , require("./app/routes/Users/adminRouts"))
 app.use("/Barber" , require("./app/routes/Users/barberRoute"))
//  app.use("/customer" , require("./routes/customerRoute"))



//  app.use(auth)
 app.use("/imageUpload" , require("./app/routes/IMAGE_UPLOAD/imageUploadRoute"))
 app.use("/lenght" , require("./app/routes/HAIR/lengthRoute"))
 app.use("/hairStyle" , require("./app/routes/HAIR/hairstyleRoute"))
 app.use("/hairCutPprice" , require("./app/routes/HAIR/hairCutPriceRoute"))
 app.use("/reasonOfCancellation" , require("./app/routes/HAIR/cancellation_reasonRoute"))
/app.use("/commission" , require("./app/routes/HAIR/commissionRoute"))
 app.use("/emailVerification" , require("./app/routes/EMAIL_VERIFICATION/EmailVerificationRoute"))
//  app.use("/time_slot" , require("./routes/time_slotsRoute"))
//  app.use("/slot_day" , require("./routes/slot_daysCpntroller"))
//  app.use("/payment" , require("./routes/payment_route"))
//  app.use("/appointment" , require("./routes/appointmentRoute"))
app.use("/reasonOfComplain" , require("./app/routes/HAIR/complain_reasonRoute"))
//  app.use("/appointment_request" , require("./routes/appointmentRequestRoute"))


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});


