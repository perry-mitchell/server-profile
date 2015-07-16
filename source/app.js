(function(module) {

	"use strict";

	var Promise = require("promise-polyfill"),
		fs = require("fs"),
		Profile = require("./profile.js");

	// Taken from: http://stackoverflow.com/a/9081436/966338
	function getUserHome() {
		return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
	}

	var profilePath = getUserHome(),
		profileName = ".svrp";

	var toolkit = {

		fetchProfile: function() {
			return new Promise(function(resolve) {
				fs.exists(profilePath + "/" + profileName, function (exists) {
					if (exists) {
						(resolve)(Profile.loadFromFile(profilePath + "/" + profileName));
					} else {
						(resolve)(Profile.generate(profilePath + "/" + profileName));
					}
				});
			});
		},

		setName: function(name) {
			profileName = name;
			return this;
		},

		setPath: function(path) {
			profilePath = path;
			return toolkit;
		}

	};

	module.exports = toolkit;

})(module);
