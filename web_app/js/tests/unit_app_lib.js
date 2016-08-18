// unit tests for app_lib.js

/*
To run the tests:
casperjs test web_app/js/tests/unit_app_lib.js --includes=web_app/js/app_lib.js
*/

casper.test.begin('app_lib.js', 5, function suite(test) {

  // dedupe_array //
  var results = dedupe_array(['a'])
  test.assertEquals(results, ['a'], 'dedupe_array: single array item is returned');

  var results = dedupe_array(['a', 'a'])
  test.assertEquals(results, ['a'], 'dedupe_array: a, a');

  var results = dedupe_array(['a', 'b'])
  test.assertEquals(results, ['a', 'b'], 'dedupe_array: a, b');

  var results = dedupe_array(['a', 'a', 'c'])
  test.assertEquals(results, ['a', 'c'], 'dedupe_array: a, a, c');

  var results = dedupe_array(['a', 'a', 'b', 'b'])
  test.assertEquals(results, ['a', 'b'], 'dedupe_array: a, a, b, b');

  test.done();

});
