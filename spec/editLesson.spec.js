'use strict';


var logger = require('log4js').getLogger('editLesson');
var components = require('../source/components');
//var _ = require('lodash');

describe('edit lesson', function(){

    /**
     * This test expects a user named 'test' and password 'test' to exist which is not admin
     *
     * it checks if the user is able to edit a lesson
     */

    it('should be able to edit a lesson without errors', function( done ){
        logger.info('starting testing edit lesson');
        browser.get('/');

        components.loginPage.load().login( components.conf.editLesson.username, components.conf.editLesson.password );

        components.layout.goToUserSection();
        components.mySection.goToMyLessons().createNewLesson();
        var editor = components.lessonEdit.editor;
        editor.setDetails({'name' : 'test name', 'description' : 'test description', 'subject' : 'English','language':'Hebrew', 'age' : 10,'tags' : 'testTag'});
        editor.clickDone();
        components.layout.logout();
        browser.sleep(5000).then(function(){ done(); });
    });

});