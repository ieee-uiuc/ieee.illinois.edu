const CronJob = require("cron").CronJob
const notificationsWorker = require("./middlewares/notificationsWorker")
const moment = require("moment")

const schedulerFactory = function () {
  return {
    start: function () {
      new CronJob(
        "00 * * * * *",
        function () {
          console.log(
            "Running Send Notifications Worker for " + moment().format()
          )
          notificationsWorker.run()
        },
        null,
        true,
        ""
      )
    },
  }
}

module.exports = schedulerFactory()
