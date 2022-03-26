require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const fileUpload = require("express-fileupload")
const path = require("path")

const scheduler = require("./scheduler")

const app = express()

//middleware
app.use(express.json())
app.use(cors())
app.use(
  fileUpload({
    useTempFiles: true,
  })
)

//connect to mongodb
const URI = process.env.MONGO_URL

mongoose.connect(
  URI,
  {
    userCreateIntdex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err
    else {
      return console.log(`mongo db connected`)
    }
  }
)

//routes
app.locals.moment = require("moment")
app.use("/contact", require("./routes/contactRoute"))
app.use("/user", require("./routes/userRoute"))
app.use("/", require("./routes/aboutRoute"))
app.use("/", require("./routes/advertisingRoute"))
app.use("/", require("./routes/boardRoute"))
app.use("/", require("./routes/eventRoute"))
app.use("/", require("./routes/upload"))
app.use("/", require("./routes/appointmentRoute"))

PORT = process.env.PORT || 5000

app.use(function (req, res, next) {
  const err = new Error("Not Found")
  err.status = 404
  next(err)
})

app.use(function (err, req, res, next) {
  console.error(err)
  res.status(err.status || 500)
  res.render("error", {
    message: err.message,
    error: {},
  })
})

scheduler.start()

//static

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build/"))
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
  )
}

app.listen(PORT, () => {
  console.log(`server listening on port:${PORT}`)
})

