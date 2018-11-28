/* External libraries */
const Discord = require("discord.js")
const path = require("path")
const fs = require("fs")

/* Internal Libraries */
const log = require(path.join(__dirname, "logging.js"))

/* Required files */
const config = require(path.join(__dirname, "..", "config", "config.json"))

/* Start the bot */
log.ok.timecode("Starting...")
const readySpinner = log.ok.spinner("Loading: Initializing...")
const client = new Discord.Client()

// Do the rest of it in fancy es2017
async function init () {
	// Load up our command parsing library
	readySpinner.text = log.ok.color("Loading: Commands initializing...")
	const commands = require(path.join(__dirname, "commands.js"))(client)
	readySpinner.succeed(log.ok.color(`Loading: ${commands} commands loaded!`))

	// This is a true global (I know, ugly)
	readySpinner.start(log.ok.color("Loading: Loading Amped playlists..."))
	AmpedJSON = require(path.join(__dirname, "playlist_loader.js"))()
	readySpinner.succeed(log.ok.color(`Loading: ${Object.keys(AmpedJSON).length} playlists loaded!`))

	client.on("ready", () => {
		readySpinner.succeed(log.ok.color("Loading complete!"))
		log.ok.timecode(`Client connected to Discord! -- ${client.user.username}#${client.user.discriminator}`)
	})

	readySpinner.start(log.ok.color("Loading: Waiting for Discord Connection..."))
	client.login(config.token)
}

init()


// Some misc stuff
process.on("exit", (code) => {
	for (let connection of client.voiceConnections.values()) {
		connection.disconnect()
	}
})