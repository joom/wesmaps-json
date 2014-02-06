module.exports = function(depCode, termCode, cb) {
    var scraper = require('scraper'),
        getParam = require('./getParam.js'),

    depCode = depCode.toUpperCase();
    var url = 'https://iasext.wesleyan.edu/regprod/!wesmaps_page.html?crse_list=' + depCode + '&term=' + termCode + '&offered=Y';
    


    scraper(url, function(err, jQuery) {
        if (err) {
            cb(err);
        }
        var courses = [];
        jQuery("a[href^='!wesmaps_page.html?crse=']").each(function() {
            var obj = {};

            var row = jQuery(this).parent().parent();
            var courseLink = row.find('td:eq(0)');
            var courseLinkParam = getParam(jQuery(this).attr('href'));
            obj.id = courseLinkParam.crse;
            obj.code = courseLink.text().trim();
            obj.term = parseInt(courseLinkParam.term);
            obj.name = row.find('td:eq(1)').text().trim();
            var combined = row.find('td:eq(2)').html().split('<br />');
            //console.log(combined);
            obj.profs = [];

            var i = 0;

            while (i < (combined.length - 1)) {
                obj.profs.push({
                    name: jQuery(combined[i]).text().trim(),
                    user: getParam(jQuery(combined[i]).attr('href')).faculty
                });
                i++;
            }

            combined = combined[i].split(';');
            obj.time = combined[0].trim();
            obj.loc = combined[1].trim();

            //this is probably gonna be wasteful
            if (obj.term === termCode) {
                courses.push(obj);
            }
        });
        cb(null, courses);
    });
}