/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        it("shoud have URL defined", function() {
            allFeeds.forEach(function(oneFeed) {
                expect(oneFeed.url).toBeDefined();
                expect(oneFeed.url).not.toBe("");
            });
        });

        /* This is a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        it("should have name defined", function() {
            allFeeds.forEach(function(oneFeed) {
                expect(oneFeed.name).toBeDefined();
                expect(oneFeed.name).not.toBe("");
            });
        });
    });


    /* This is a new test suite named "The menu" */
    describe('The menu', function() {
        /* This is a test that ensures the menu element is
         * hidden by default.
         */
        it("should be hidden by default", function() {
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });

        /* This is a test that ensures the menu changes
         * visibility when the menu icon is clicked. This test
         * should have two expectations: menu display when
         * clicked and hide when clicked again.
         */
        it("should toggle menu visibility when click menu icon", function() {
            var $menuIcon = $('.menu-icon-link');
            //click once, open menu
            $menuIcon.trigger("click");
            expect($("body").hasClass("menu-hidden")).toBe(false);
            //click again, close menu
            $menuIcon.trigger("click");
            expect($("body").hasClass("menu-hidden")).toBe(true);
        });
    });



    /* This is a new test suite named "Initial Entries" */
    describe("Initial Entries", function() {
        /* This is a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        beforeEach(function(done) {
            loadFeed(0, done);
        });

        it("should have at least one article when load feed", function(done) {
            expect($(".feed").find(".entry")[0]).toBeDefined();
            done();
        });

    });


    /* This is a new test suite named "New Feed Selection" */
    describe("New Feed Selection", function() {
        /* This is a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        var feedOne;
        var feedTwo;
        beforeEach(function(done) {
            loadFeed(0, done);
            feedOne = $(".feed");
            loadFeed(1, done);
            feedTwo = $(".feed");
        });

        it("should load new feed when load feed", function() {
            expect(feedOne === feedTwo).toBe(false);
        });
    });
}());