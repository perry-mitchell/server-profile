(function(module) {

	"use strict";

	var Promise = require("promise-polyfill"),
		fs = require("fs"),
		Profile = require("./profile.js");

	var profilePath = "~",
		profileName = ".svrp";

	var toolkit = {

		fetchProfile: function() {
			return new Promise(function(resolve) {
				fs.exists(profilePath + "/" + profileName, function (exists) {
					if (exists) {
						return Profile.loadFromFile(profilePath + "/" + profileName);
					} else {
						return Profile.generate(profilePath + "/" + profileName);
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

//module.exports.fetchProfile();