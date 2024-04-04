// Alphas only, no symbols or numbers
function validateName(name) {
    const regex = /^[A-Za-z\s]+$/; 
    return regex.test(name);
}

// No alphabets, symbols are okay
function validatePhone(phone) {
    const regex = /^[0-9+\s()-\.]+$/; 
    return regex.test(phone);
}

// Follow proper email format
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Non-negative numbers only, no alphas or symbols
function validateSalary(salary) {
    const regex = /^\d+$/; 
    return regex.test(salary) && parseInt(salary) >= 0;
}

// JOB_ID proper format A-Z_A-Z
function validateJobId(jobId) {
    const regex = /^[A-Z]+(?:_[A-Z]+)*$/;
    return regex.test(jobId);
}

function addErrorBorder(inputId) {
    document.getElementById(inputId).classList.add('input-error');
}
 
 function removeErrorBorder(inputId) {
    document.getElementById(inputId).classList.remove('input-error');
}
 

// Exporting validators if using modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        validateName, 
        validatePhone,
        validateEmail,
        validateSalary,
        validateJobId,
        addErrorBorder,
        removeErrorBorder
    };
}
