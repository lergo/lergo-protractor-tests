'use strict';

var logger = require('log4js').getLogger('QuestionEditor.index');

var AbstractQuestion = require('./AbstractView');
exports.abstract = new AbstractQuestion();
exports.multichoice = require('./QuestionMultichoiceView');
exports.trueFalse = require('./QuestionTrueFalseView');
exports.open = require('./QuestionOpenView');


exports.QUESTION_TYPE = {
    'OPEN' : 'open',
    'TRUE_FALSE': 'trueFalse',
    'MULTICHOICE' : 'multichoice'
};

/**
 *
 * @param {LERGO_QUESTION_TYPE} type
 */
exports.getByType = function( type ){
    type = type ? type.id : 'abstract';
    if ( !exports[type] ){
        var e = new Error('type [' + type + '] is not supported');
        logger.error('unable to instantiate question editor', e);
        throw e;
    }
    return exports[type];
};


exports.submit = function(){
    $click('checkAnswer()').click();
};
