(function(module) {

	"use strict";

	var getmac = require('getmac'),
		getIP = require('external-ip')(),
		Moniker = require('moniker'),
		fs = require("fs"),
		sha256 = require('js-sha256').sha256,
		Promise = require("promise-polyfill");

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	var Profile = function() {
		this._info = {
			name: "",
			id: "",
			mac: "",
			extIP: ""
		};
	};

	Profile.fromData = function(data) {
		var profile = new Profile();
		profile._info.name = data.name;
		profile._info.id = data.id;
		profile._info.mac = data.mac;
		profile._info.extIP = data.extIP;
		return new Promise(function(resolve) {
			getIP(function(err, ip) {
				if (!err) {
					profile._info.extIP = ip;
				}
				(resolve)(profile);
			});
		});
	};

	Profile.generate = function(filename) {
		var profile = new Profile();
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
		}).then(function() {
			profile._info.id = sha256(
				profile._info.name +
				profile._info.mac +
				profile._info.extIP +
				getRandomInt(0, 999999999)
			);
		}).then(function() {
			return new Promise(function(resolve, reject) {
				fs.writeFile(filename, JSON.stringify(profile._info), function (err) {
					if (err) {
						(reject)(err);
					} else {
						(resolve)(profile);
					}
				});
			});
		});
	};

	Profile.loadFromFile = function(filename) {
		return new Promise(function(resolve, reject) {
			fs.readFile(filename, 'utf8', function (err, data) {
				var jsData = JSON.parse(data);
				if (jsData && jsData.name) {
					Profile.fromData(jsData).then(resolve);
				} else {
					(reject)(err);
				}
			});
		});
	};

	module.exports = Profile;

})(module);