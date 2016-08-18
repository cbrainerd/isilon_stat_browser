// Smoke tests for Isilon Stat Browser
//
// Loads index.html into a phantomjs browser
// verify page title is set
// verify title text is displayed
// verify search box is displayed
// Verfiy reset button is displayed
// verify tags button is displayed
// verify top-level categories are visible
// verify category sub-contents are not visible
// verify individual keys are not visible

/*
To run the tests:
casperjs test web_app/js/tests/smoke.js
*/

casper.test.begin('Smoke Test', 8, function suite(test) {
    casper.start('web_app/index.html', function() {
        test.assertTitle('EMC | Isilon OneFS Statistics', 'page title is set')
        test.assertSelectorHasText('h1.col-md-12', 'EMC | Isilon OneFS Statistics', 'title text is displayed');
        test.assertVisible('#text_filter', 'search box is displayed')
        test.assertVisible('#resetButton', 'reset button is displayed')
        test.assertVisible('#tagDropdown', 'tags dropdown is displayed')
        test.assertVisible('div.category_main', 'top-level categories are visible')
        test.assertNotVisible('div.subcontents', 'category sub-contents are not visible')
        test.assertNotVisible('div.key_main', 'individual keys are not visible')

    }).run(function() {
        test.done();
    });
});
