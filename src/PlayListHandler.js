const fs = require("fs")
const path = require("path")
const ytdl = require("ytdl-core")

let _plh = []
let globID = 0
module.exports = class PlayListHandler {
	constructor (message, channel, playlist) {
		PlayListHandler.MUUUURDER(channel)

		_plh.push(this)
		this.id = ++globID
		this.message = message
		this.channel = channel
		this.channel.connection.on("disconnect", () => {
			this.kill()
		})

		this.playlist = playlist
		this.stream = null
		this.dispatcher = null
		this.play()
	}

	getNextSong () {
		let song = this.playlist[Math.floor(Math.random() * this.playlist.length)];
		return song
	}

	play () {
		let song = this.getNextSong()
		
		if (!this.channel.connection) {
			return this.kill()
		}

		try {
			this.stream = ytdl(song.identifier, { filter: 'audioonly' })
		} catch (err) {
			console.error(err)
			this.kill()
			return
		}

		if(this.destroyed)
			return

		this.message.channel.send(`Now playing: ${song.title}`)
		this.dispatcher = this.channel.connection.playStream(this.stream)
		this.dispatcher.on("end", (raisin) => {
			if(raisin === "PLH death")
				return

			if(!this.destroyed)
				this.play()
		})
	}

	kill () {
		if(this.destroyed)
			return // we ded already
		this.destroyed = true
		let index = _plh.findIndex(x => x.id === this.id)
		if(index)
			_plh.splice(index, 1)
		if (this.dispatcher && !this.dispatcher.destroyed)
			this.dispatcher.end("PLH death")
	}

	static MUUUURDER(channel) {
		for (let PLH of _plh) {
			if (PLH.channel.id === channel.id) {
				PLH.kill()
			}
		}
	}
}