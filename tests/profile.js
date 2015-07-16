var fs = require("fs"),
	Profile = require("../source/profile.js");

function deleteFileIfExists(filename, cb) {
	fs.exists(filename, function(exists) {
		if (exists) {
			fs.unlink(filename, cb);
		} else {
			(cb)();
		}
	});
}

module.exports = {
    setUp: function(done) {
        this.profilePath = "./svrp";
        this.testProfileData = {
            name: "crusty-squirrel",
            id: "d2890528df66dbdb3831717e92d0d6d1b75e34f376733626d562d42910095d2d",
            mac: "28:cf:a9:21:11:b5",
            extIP: "0.0.0.0"
        };
        deleteFileIfExists(this.profilePath, done);
    },
    tearDown: function(done) {
        // clean up
        deleteFileIfExists(this.profilePath, function() {
            setTimeout(done, 100);
        });
    },

    testCreatesProfile: function(test) {
        Profile.generate(this.profilePath).then(function(profile) {
            test.strictEqual(profile instanceof Profile, true, "Returned profile is not instance of Profile");
            test.done();
        });
    },

    testCreatesFromData: function(test) {
        var expectedData = this.testProfileData;
        Profile.fromData(this.testProfileData).then(function(profile) {
            expectedData.extIP = profile._info.extIP;
            test.deepEqual(profile._info, expectedData, "Profile data is incorrect or missing");
            test.done();
        });
    }
};