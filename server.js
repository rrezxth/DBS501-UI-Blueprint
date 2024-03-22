const HTTP_PORT = process.env.PORT || 3000;

const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const cors = require('cors');
const database = require('./database');



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

// Others
app.use(cors());
app.use(express.json());

// ---------------------------------------------------------
// ENDPOINTS

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
    res.render('displayJobPage');   
});

// Edit job info
app.get('/displayAllJobInfo/editJob', (req, res) => {
    res.render('editJobPage');   
});

// Create job info
app.get('/createNewJob', (req, res) => {
    res.render('createJobPage');   
});

// ---------------------------------------------------------
// APIs

// Returns * of hr_jobs
app.get('/api/getjobsinfo', async (req, res) => {
    try {
        const jobsData = await database.getJobsInfo();

        res.json(jobsData);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});

// Returns [managers] of hr_employees
app.get('/api/getmanagersinfo', async (req, res) => {
    try {
        const managersData = await database.getManagersInfo();

        res.json(managersData);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});

// Returns [departments] of hr_departments
app.get('/api/getdepartmentsinfo', async (req, res) => {
    try {
        const departmentsData = await database.getDepartmentsInfo();

        res.json(departmentsData);
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});

// Insert new employee record
app.post('/hire-employee', async (req, res) => {
    try {   
        await database.createNewEmployee(req.body);

        res.status(200).send('Employee hired successfully.');
    } catch (error) {
        console.error('Failed to hire employee:', error);
        res.status(500).send('Failed to hire employee.');
    }
});

// Returns [employees] of hr_employees
app.get('/api/getemployeesinfo', async (req, res) => {
    try {
        const employeesData = await database.getEmployeesInfo();

        res.json(employeesData);
    } catch (err) { 
        res.status(500).send('Internal server error');
    }
});

// Returns job_title from hr_jobs
app.get('/api/getjobtitle', async (req, res) => {
    try {
        const jobId = req.query.jobId;
        const jobTitleData = await database.getJobTitle(jobId);

        res.json({ jobTitle: jobTitleData });
    } catch (err) {
        res.status(500).send('Internal server error');
    }
});




// Log connection
app.listen(HTTP_PORT, () => {
    console.log('Listening on PORT: ' + HTTP_PORT);
});


