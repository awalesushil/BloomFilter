var redis = require('redis');
var murmurHash3 = require('murmurhash3js');

var client = redis.createClient();

client.on('connect', function () {
    console.log("Connected to redis.");
});

var bit;

module.exports = {
    set: function(string) {
        client.setbit('bloomFilter', murmurHash3.x86.hash32(string), 1);
    },
    get: function(string) {
        client.getbit('bloomFilter', murmurHash3.x86.hash32(string), function(err, value){
            if (err) throw err;
            bit = value;
        });
        return bit;
    }
};
