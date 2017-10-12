var geoip = require('../lib/geoip');

module.exports = {
	testLookup: function(test) {
		test.expect(2);

		var ip = '8.8.4.4';
		var ipv6 = '2001:4860:b002::68';

		var actual = geoip.lookup(ip);

		test.ok(actual, 'should return data about IPv4.');

		actual = geoip.lookup(ipv6);

		test.ok(actual, 'should return data about IPv6.');

		test.done();
	},

	testUTF8: function(test) {
		test.expect(2);

		var ip = "95.23.1.184";
		var expected = "ES";
		var actual = geoip.lookup(ip);

		test.ok(actual, "Should return a non-null value for " + ip);
		test.equal(actual.country, expected, "UTF8 city name does not match");

		test.done();
	},

	testIPv4MappedIPv6: function (test) {
		test.expect(1);

		var actual = geoip.lookup("::ffff:173.185.182.82");

		test.equal(actual.country, "US");

		test.done();
	},

	testIPv6: function (test) {
		test.expect(1);

		var actual = geoip.lookup("2a00:23c5:bc81:5800:413d:3b7b:623e:ba02");

		test.equal(actual.country, "GB");

		test.done();
	}
};
