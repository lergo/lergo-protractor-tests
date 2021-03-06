'use strict';

var logger = browser.getLogger('preview');
var components = require('components');

describe('lesson intro', function () {

    beforeEach(function(){ logger.info('running from ' + __filename); });
    /**
     * This test expects
     *   1. lesson `lesson_with_edit_summary` to exist
     *   2. lesson should :
     *     2.a. be copied from another lesson
     *     2.b. have questions from other users
     *     2.c. have questions copied from other users
     *
     * it displayed that edit summary in intro contains the correct info
     */

    it('should give credit to original lesson and question', function (done) {
        logger.info('starting testing preview lesson');
        browser.get('/');
        browser.sleep(1000);

        components.homepage.goToLessonIntro({'name': 'lesson_with_edit_summary'});

        components.lesson.intro.descriptionReadMore(true);
        components.lesson.intro.getEditSummaryText().then(function(text){
            expect(new RegExp('q_from_other_1\nQuestion created by lergotestadmin').test(text)).toBe(true, 'q_from_other_1 should have credit for lergotestadmin');
            expect(new RegExp('Copy of : q_to_copy_1\nCopied from q_to_copy_1 by lergotestadmin').test(text)).toBe(true, 'q_to_copy_1 should have creadit for lergotestadmin');
        });
        browser.sleep(1000);



        components.homepage.goToLessonIntro({'name' : 'Copy of : lesson_to_copy_1'});
        components.lesson.intro.descriptionReadMore(true);
        components.lesson.intro.getEditSummaryText().then(function(text){
            expect(new RegExp('Lesson was originally copied from lesson lesson_to_copy_1 by lergotestadmin').test(text)).toBe(true,'original lesson should have credit');
            expect(new RegExp('Question created by lergotestadmin').test(text)).toBe(true, 'questions from copied lesson should give credit to creator');
        });

        browser.sleep(1000).then(done);


    });

    describe('limited editor', function(){
        it('should not be able to edit lesson if public', function(){
            components.loginPage.load().login(components.conf.availableUsers.limitedEditor);
            components.homepage.goToLessonIntro({name:'test_continue_lesson'});
            expect(components.lesson.intro.getEditButton().isDisplayed()).toBeFalsy('limited editor should NOT be able to edit public lesson');
            components.layout.logout();
        });
    });



});
