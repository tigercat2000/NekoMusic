## NekoMusic v2

This is the code for NekoBot, running currently on [Paradise's](https://nanotrasen.se/) SS13 Discord server.

It is a NodeJS Discord Music Bot running the [discord.js](https://discord.js.org) library. 
It's primary goal is playing music, using playlists from [Amped.fm](https://amped.fm/).

### Minor notes: 

Currently, all of the playlists are about 2 years old and are just hardcoded .json files in `amped_json`. 
They may contain references to `Discord.FM`, as they were originally harvested before the Amped.FM rebrand.

I have absolutely no idea the actual rights on those files, as they're just internal JSON that was released
at one point for people to use. To be on the safe side, I have currently left a LICENSE disclaimer stating
that all rights are reserved to Amped.FM.

If anyone from that service has an issue with these JSON files being present in this repository, please contact me, 
and I will be more than happy to work with you in the pursuit of a better solution.
