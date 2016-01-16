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

  /* a test suite just contains
   * a related set of tests. This suite is all about the RSS
   * feeds definitions, the allFeeds variable in our application.
   */
  describe('RSS Feeds', function() {

    /* A set of tests to make sure that the
     * allFeeds variable has been defined and that it is not
     * empty.
     */
    it('are defined and not-empty', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* This set of test loops through each feed
     * in the allFeeds object and ensures it has a URL defined
     * and that the URL is not empty.
     */
    it('have urls that are not-empty', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].url).toBeDefined();
        expect(allFeeds[i].url).not.toBe('');
      }
    });


    /* A test that loops through each feed
     * in the allFeeds object and ensures it has a name defined
     * and that the name is not empty.
     */
    it('have names that are not-empty', function() {
      for (var i = 0; i < allFeeds.length; i++) {
        expect(allFeeds[i].name).toBeDefined();
        expect(allFeeds[i].name).not.toBe('');
      }
    });

  });


  /* test suite regarding the menu */
  describe('The menu', function() {

    /* A test that ensures the menu element is
     * hidden by default.
     */
    it('starts hidden by default', function() {
      expect($('.menu-hidden').length).toBe(1);
    });

    /* A test that ensures the menu changes
     * visibility when the menu icon is clicked.
     */
    it('visibility toggles on click', function() {

      $('.menu-icon-link').trigger('click');
      expect($('.menu-hidden').length).toBe(0);

      $('.menu-icon-link').trigger('click');
      expect($('.menu-hidden').length).toBe(1);

    });

  });

  /* A test suite to test the initial entries */
  describe('Initial Entries', function() {

    beforeEach(function(done){
      loadFeed(0, done);
    });
    /* A test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    it('should have been loaded asynchronously', function(){
      expect($('.feed .entry').length).not.toBe(0);
    });
  });

  /* A test suite used to evaluate new feeds loading */
  describe('New Feed Selection', function() {
    var firstEntry;

    /* first loads the first feed,
     * saves the value of the first entry in the firstEntry var
     * than loads the second one
     */
    beforeEach(function(done){
      loadFeed(0, function() {
        firstEntry = $('.feed .entry')[0];
        loadFeed(1, done);
      });
    });

    /* A test that ensures that when a new feed is loaded
     * by the loadFeed function, the content actually changes.
     */
    it('should have been loaded new feed', function(){
      console.log(firstEntry, $('.feed .entry')[0]);
      expect($('.feed .entry')[0]).not.toEqual(firstEntry);
    });

  });
}());
