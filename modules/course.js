module.exports = function(courseCode, termCode, cb) {
    var scraper = require('scraper'),
        getParam = require('./getParam.js');

    var url = 'https://iasext.wesleyan.edu/regprod/!wesmaps_page.html?crse=' + courseCode + '&term=' + termCode;

    scraper(url, function(err, jQuery) {
        if (err) {
            cb(err);
        }
        var course = {
            title       : jQuery('.title').text(),
            desc        : jQuery('td[colspan=3]').eq(1).text().trim(),
            credit      : parseFloat(jQuery("td:contains('Credit:')").text().split('Credit:')[1].trim()),
            gradingMode : jQuery("td:contains('Grading Mode:')").text().split('Grading Mode:')[1].trim(),
            courseFormat: jQuery("td:contains('Course Format:')").text().split('Course Format:')[1].trim(),
            level       : jQuery("td:contains('Level:')").text().split('Level:')[1].trim(),
            prereq      : jQuery("td:contains('Prerequisites:')").text().split('Prerequisites:')[1].trim(),
            majorReq    : jQuery("td:contains('Fulfills a Major Requirement for:')").text().split('Fulfills a Major Requirement for:')[1].trim(),
            genEd       : jQuery("td:contains('Gen Ed Area Dept:')").text().split('Gen Ed Area Dept:')[1].trim(),
            sections    : []
        };
        var topTable = jQuery('.title').next().next().children();

        var sections = jQuery("table[border='1']");

        sections.each(function (index) {
            var obj = {id: index+1};
            var section = jQuery(this);

            course.sections.push(obj);
        })

        //arranges major requirements into array instead of string
        course.majorReq = course.majorReq.replace(/^[^(]*\(/, "").replace(/\)[^(]*$/, "").split(/\)[^(]*\(/);
        if(course.majorReq.length === 1 && course.majorReq[0] === "None") {
            course.majorReq = [];
        }

        cb(null, course);
    });
}