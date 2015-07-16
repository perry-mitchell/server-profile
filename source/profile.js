(function(module) {

	"use strict";

	var getmac = require('getmac'),
		getIP = require('external-ip')(),
		Moniker = require('moniker'),
		Promise = require("promise-polyfill");

	var Profile = function() {
		this._info = {
			name: "",
			id: "",
			mac: "",
			extIP: ""
		};
	};

	Profile.generate = function(filename) {
		var profile = new Profile;
		var generation = new Promise(function(resolve) {
			getmac.getMac(function(err, macAddress) {
				if (!err) {
					profile._info.mac = macAddress;
				}
				(resolve)();
			});
		});
		return generation.then(function() {
			return new Promise(function(resolve) {
				getIP(function(err, ip) {
					if (!err) {
						profile._info.extIP = ip;
					}
					(resolve)();
				});
			});
		}).then(function() {
			var names = Moniker.generator([Moniker.adjective, Moniker.noun]);
			profile._info.name = names.choose();
		}).catch(function(err) {
			throw err;
		});
	};

	Profile.loadFromFile = function(filename) {

	};

	module.exports = Profile;

})(module);