# Server Profile

A nodejs profile generator and manager for servers.

## About

server-profile generates a _fingerprint_ of the machine it's running on, and saves it to disk. Each subsequent request for the profile will load the previously written profile. The IP address (external) stored is updated upon each load.

### Fingerprint data

The structure of the fingerprint:

```
{
	"name": "Name of the server (unique, generated)",
	"id": "sha256 hash of some of the fingerprint data",
	"mac": "Mac address of the machine",
	"extIP": "External IP address"
}
```

## Usage

To fetch a profile:

```
require("server-profile").fetchProfile().then(function(profile) {
	console.log("I am " + profile.getName()); // I am wary-rabbits
});
```

Or by specifying a profile path:

```
require("server-profile")
	.setPath("/home/ubuntu")
	.setName(".svrp")
	.fetchProfile()
		.then(function(profile) {});
```