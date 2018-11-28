const fs = require("fs")
const path = require("path")
const util = require("util")

const ampedDir = path.join(__dirname, "..", "amped_json")

module.exports = () => {
	// Lol doin this totally synchronous because fucking node keeps terminating the event loop
	let dirContents = fs.readdirSync(ampedDir)
	let loadedJSON = {}

	for (let file of dirContents.filter(x => x.endsWith(".json"))) {
		let fullPath = path.join(ampedDir, file)
		let fileContents = JSON.parse(fs.readFileSync(fullPath, 'utf8'))
		fileContents = fileContents.filter(song => song.service === "YouTubeVideo")
		loadedJSON[file.substring(0, file.length - 5)] = fileContents
	}

	return loadedJSON
}