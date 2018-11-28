/* Dependencies */
const chalk = require("chalk")
const moment = require("moment")
const ora = require("ora")
const util = require("util")

/* Configuration */
const COLORS = {
	OKAY: chalk.blue,
	WARN: chalk.yellow,
	ERROR: chalk.red
}

const TIMEFORMAT = "\\[YYYY-MM-DD HH:mm:ss\\]"

/* Helpers */
const TIMECODE = (args) => { args.unshift(moment().format(TIMEFORMAT)) }
const UTILIFY = (args, color) => { return args.map(x => color(x)) }

/* Actual logger stuff */
const logger = {}

/* OK messages */
logger.ok = {}
logger.ok.log = (...args) => { console.log.apply(null, UTILIFY(args, COLORS.OKAY)) }
logger.ok.timecode = (...args) => { TIMECODE(args); console.log.apply(null, UTILIFY(args, COLORS.OKAY)) }
logger.ok.spinner = (text) => { return ora({color: "blue"}).start(COLORS.OKAY(text)) }
logger.ok.color = COLORS.OKAY

/* Warn messages */
logger.warn = {}
logger.warn.log = (...args) => { console.log.apply(null, UTILIFY(args, COLORS.WARN)) }
logger.warn.timecode = (...args) => { TIMECODE(args); console.log.apply(null, UTILIFY(args, COLORS.WARN)) }
logger.warn.spinner = (text) => { return ora({color: "yellow"}).start(COLORS.OKAY(text)) }
logger.warn.color = COLORS.WARN

/* Error messages */
logger.error = {}
logger.error.log = (...args) => { console.log.apply(null, UTILIFY(args, COLORS.ERROR)) }
logger.error.timecode = (...args) => { TIMECODE(args); console.log.apply(null, UTILIFY(args, COLORS.ERROR)) }
logger.error.spinner = (text) => { return ora({color: "red"}).start(COLORS.OKAY(text)) }
logger.error.color = COLORS.ERROR

module.exports = logger