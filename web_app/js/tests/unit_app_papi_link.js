// unit tests for app_papi_link.js

/*
To run the tests:
casperjs test web_app/js/tests/unit_app_papi_link.js --includes=web_app/js/app_papi_link.js
*/

// Polyfill for phantomjs
if (!String.prototype.endsWith) {
  String.prototype.endsWith = function(searchString, position) {
      var subjectString = this.toString();
      if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length) {
        position = subjectString.length;
      }
      position -= searchString.length;
      var lastIndex = subjectString.indexOf(searchString, position);
      return lastIndex !== -1 && lastIndex === position;
  };
}

casper.test.begin('app_papi_link.js', 4, function suite(test) {

  // antisquash_key //
  test.assertEquals(antisquash_key('abc'), 'abc', 'antisquash_key: non-squashed key is unmodified')
  test.assertEquals(antisquash_key('abc.N'), 'abc.1', 'antisquash_key: squashed key .N is replaced with .1')
  test.assertEquals(antisquash_key('a.N.b'), 'a.N.b', 'antisquash_key: embedded .N is unmodified')
  test.assertEquals(antisquash_key('a a.b b'), 'a a.b b', 'antisquash_key: spaces are handled')

  test.done();
});
