/* External Libraries */
const path = require("path")
const util = require("util")

/* Internal Libraries */
let PlayListHandler = require(path.join(__dirname, "PlayListHandler.js"))

/* Globals */
let commandsLoaded = 0
let commands = []

class Command {
	get name () { return ""; }
	get regex () { return null; }

	constructor () {
		commandsLoaded++
		if (this.name)
			commands.push(this)
	}

	canActivate (message) {
		if (this.regex && this.regex.test(message.content)) {
			if (this.specialConditions(message))
				return true
		}
		return false
	}

	specialConditions (message) { return true; }
	activate (message) { }
}

new (class Join extends Command {
	get name () { return "join"; }
	get regex () { return /^🐱join/i; }

	specialConditions (message) { return message.guild }

	activate (message) {
		if (!message.member.voiceChannel)
			return message.reply("You need to be in a voice channel to use this command.")
		
		message.member.voiceChannel.join().catch((err) => message.reply(util.format(err)))
	}
})

new (class Leave extends Command {
	get name () { return "leave"; }
	get regex () { return /^🐱leave/i; }

	specialConditions (message) { return message.guild }

	activate (message) {
		if (!message.member.voiceChannel)
			return message.reply("You need to be in a voice channel to use this command.")
		
		if (!message.member.voiceChannel.connection)
			return message.reply("The voice channel you are in must be the same one this bot is in.")
		
		PlayListHandler.MUUUURDER(message.member.voiceChannel)
		message.member.voiceChannel.leave()
	}
})

new (class Play extends Command {
	get name () { return "play"; }
	get regex () { return /^🐱play/i; }

	specialConditions (message) { return message.guild }

	activate (message) {
		if (!message.member.voiceChannel)
			return message.reply("You need to be in a voice channel to use this command.")
		
		if (!message.member.voiceChannel.connection)
			return message.reply("You must use the :cat:join command first.")
		
		// Todo: Refactor this logic into a module
		let targetPlaylist = message.content.split(" ").splice(1).join(" ").toLowerCase().trim()

		if (!AmpedJSON.hasOwnProperty(targetPlaylist))
			return message.reply(`Unrecognized playlist: ${targetPlaylist}. The playlists available are: ${Object.keys(AmpedJSON).join(", ")}`)

		new PlayListHandler(message, message.member.voiceChannel, AmpedJSON[targetPlaylist])
	}
})

module.exports = (client) => {
	client.on("message", (message) => {
		for (let command of commands) {
			if (command.canActivate(message)) {
				command.activate(message)
			}
		}
	})

	return commandsLoaded
}