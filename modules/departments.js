module.exports = function(cb) {
    var scraper = require('scraper'),
        getParam = require('./getParam.js');

    scraper('https://iasext.wesleyan.edu/regprod/!wesmaps_page.html', function(err, jQuery) {
        if (err) {
            cb(err);
            return;
        }
        var departments = [];
        jQuery("a[href^='!wesmaps_page.html?subj_page=']").each(function() {
            var obj = {};
            obj.name = jQuery(this).text().trim();
            obj.code = getParam(jQuery(this).attr('href')).subj_page;
            departments.push(obj);
        });
        cb(null, departments)
    });
}