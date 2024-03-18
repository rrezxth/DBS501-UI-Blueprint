const HTTP_PORT = process.env.PORT || 3000;

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();

// Configure express-handlebars engine
app.engine(".hbs", exphbs.engine({
    extname: ".hbs",
    defaultLayout: false,
    layoutsDir: path.join(__dirname, "/views"),
    partialsDir: path.join(__dirname, "views/partials")
}));
app.set("view engine", ".hbs");

// Configure the public directory
const publicDirectoryPath = path.join(__dirname, '/public');
app.use(express.static(publicDirectoryPath));

// ---------------------------------------------------------
// HOME page
app.get('/', (req, res) => {
    res.render('index');
});

// Hiring page
app.get('/hiringForm', (req, res) => {
    res.render('hiringPage');   
});

// Display all employees (clickable rows)
app.get('/displayAllEmployees', (req, res) => {
    res.render('displayEmpPage');
});

// Edit employee information
app.get('/displayAllEmployees/editEmployee', (req, res) => {
    res.render('editEmpPage');
});

// Find job title page
app.get('/findJobTitle', (req, res) => {
    res.render('findJobPage');   
});

// Display all jobs
app.get('/displayAllJobInfo', (req, res) => {
    res.render('displayJobsPage');   
});

// 


// Log connection
app.listen(HTTP_PORT, () => {
    console.log('Listening on PORT: ' + HTTP_PORT);
});