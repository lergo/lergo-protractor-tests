'use strict';
var AWS = require('aws-sdk');
var _ = require('lodash');
var path = require('path');
var awsDetails = require(process.env.AWS_JSON || path.resolve(__dirname, '/vagrant/dev/aws.json'));

var logger = require('log4js').getLogger('copy_s3_artifacts');
var s3 = new AWS.S3({ accessKeyId: awsDetails.accessKey, secretAccessKey : awsDetails.secretAccessKey });

var promoteBuild = process.env.PROMOTE_BUILD_NUMBER;

if ( !promoteBuild ){
    logger.error('PROMOTE_BUILD_NUMBER is missing');
    process.exit(1);
}

logger.info('PROMOTE_BUILD_NUMBER is ' + promoteBuild);

var files = ['build.id','install.sh','lergo-ri-0.0.0.tgz','lergo-ui-0.0.0.tgz'];


_.each(files, function(f){
    s3.copyObject({
        Bucket: awsDetails.bucket,
        CopySource: 'lergo-backups/artifacts/build-lergo-' + promoteBuild+ '/jobs/build-lergo/' + promoteBuild + '/' + f,
        Key : 'artifacts/latest-test/' + f,
        ACL: 'public-read'

    }, function(err, data) {
        if ( err ){ logger.error(err); }
        if ( data ) { logger.info(data); }

    });

});


