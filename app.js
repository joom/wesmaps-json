var express     = require('express'),
    app         = express(),
    course     = require('./modules/course.js'),
    courses     = require('./modules/courses.js'),
    departments     = require('./modules/departments.js');

app.use(express.logger());

app.get('/', function(req, res){
    res.send('Hello World');
});

app.get('/course/:course/:term', function(req, res){
    course(req.params.course, parseInt(req.params.term), function (err, courses) {
        if(err) {
            console.log('Error: ' + err);
            return;
        }
        res.json(courses);
    });
});

app.get('/courses/:dep/:term', function(req, res){
    courses(req.params.dep, parseInt(req.params.term), function (err, courses) {
        if(err) {
            console.log('Error: ' + err);
            return;
        }
        res.json(courses);
    });
});

app.get('/departments', function(req, res){
    departments(function (err, departments) {
        if(err) {
            console.log('Error: ' + err);
            return;
        }
        res.json(departments);
    });
});

app.listen(2000, function () {
    console.log('Express server started');
});