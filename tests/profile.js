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
        deleteFileIfExists(this.profilePath, done);
    },
    tearDown: function (done) {
        // clean up
        deleteFileIfExists(this.profilePath, done);
    },

    testCreatesProfile: function (test) {
        Profile.generate(this.profilePath).then(function(profile) {
            test.strictEqual(profile instanceof Profile, true, "Returned profile is instance of Profile");
            test.done();
        });
    }
};