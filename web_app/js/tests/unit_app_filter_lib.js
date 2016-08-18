// unit tests for app_filter_lib.js

/*
To run the tests:
casperjs test web_app/js/tests/unit_app_filter_lib.js \
  --includes=web_app/js/app_filter_lib.js,web_app/js/app_lib.js
*/

casper.test.begin('app_filter_lib', 18, function suite(test) {

  // parse_search_terms //
  var results = parse_search_terms('one two')
  test.assertEquals(results.length, 2, 'two terms are parsed');

  var results = parse_search_terms('    one    two   ')
  test.assertEquals(results.length, 2, 'excess whitespace is discarded');
  test.assertEquals(results[0], 'one', 'first term is parsed')
  test.assertEquals(results[1], 'two', 'seconds term is parsed')

  var results = parse_search_terms('or and not')
  test.assertEquals(results.length, 3, 'logical operators are not discarded');

  var results = parse_search_terms('AbCd')
  test.assertEquals(results[0], 'abcd', 'case is normalized');


  // match_key //
  var key = new Object()
  key.search_terms = ['a', 'b', 'c']

  test.assert(match_key(key, ['a']), 'match a single search term')
  test.assert(match_key(key, ['a', 'b']), 'match two search terms')
  test.assert(match_key(key, ['a', 'b', 'c']), 'match three search terms')

  test.assertFalsy(match_key(key, ['z']), 'non-match a single search term')
  test.assertFalsy(match_key(key, ['z', 'y']), 'non-match two search term')
  test.assertFalsy(match_key(key, ['a', 'y']), 'partial matches returns false')


  // parse_subsearches //
  results = parse_subsearches(['a', 'or', 'b'])
  test.assertEquals(results.length, 2, 'a or b is split into 2 subsearches')

  results = parse_subsearches(['a', 'and', 'b'])
  test.assertEquals(results.length, 1, 'a and b is left as single subsearch')

  results = parse_subsearches(['a', 'and', 'b'])
  test.assertEquals(results.length, 1, 'a b is left as single subsearch')


  // list_matching_keys //
  keys = {'aaa': {'search_terms': ['aaa']}, 'bbb': {'search_terms': ['bbb']}}

  results = list_matching_keys('aaa', keys)
  test.assertEqual(results[0], 'aaa', 'aaa: key match single term')

  results = list_matching_keys('aaa or bbb', keys)
  test.assertEqual(results.length, 2, 'aaa or bbb: keys match 2 terms')

  results = list_matching_keys('aaa and bbb', keys)
  test.assertEqual(results.length, 0, 'aaa and bbb: match neither term')

  test.done();
});
