// Simulating a database for user accounts, plans, and investments
let users = [];
let plans = [];
let investments = [];
let currentUser = null;

// Switch between Sign In and Sign Up forms
document.getElementById('showSignUp').addEventListener('click', function() {
    document.getElementById('signInForm').style.display = 'none';
    document.getElementById('signUpForm').style.display = 'block';
});

document.getElementById('showSignIn').addEventListener('click', function() {
    document.getElementById('signInForm').style.display = 'block';
    document.getElementById('signUpForm').style.display = 'none';
});

// User Sign Up
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('signUpUsername').value;
    const password = document.getElementById('signUpPassword').value;

    // Check if user already exists
    const userExists = users.some(user => user.username === username);

    if (userExists) {
        alert('Username already exists.');
    } else {
        users.push({ username, password });
        alert('Account created successfully! Please sign in.');
        document.getElementById('signUpForm').reset();
        document.getElementById('signInForm').style.display = 'block';
        document.getElementById('signUpForm').style.display = 'none';
    }
});

// User Sign In
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        currentUser = user;
        document.getElementById('authSection').style.display = 'none';
        document.getElementById('adminUserSection').style.display = 'block';
    } else {
        alert('Invalid username or password.');
    }
});

// Admin Panel: Create Plans
document.getElementById('planForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const planName = document.getElementById('planName').value;
    const planRate = parseFloat(document.getElementById('planRate').value);
    const planDuration = parseInt(document.getElementById('planDuration').value);
    
    const plan = {
        name: planName,
        rate: planRate,
        duration: planDuration
    };
    
    plans.push(plan);
    displayPlans();
    updateUserPlans();
    
    this.reset();
});

// Display Available Plans
function displayPlans() {
    const plansList = document.getElementById('plansList');
    plansList.innerHTML = '';
    plans.forEach((plan, index) => {
        plansList.innerHTML += `<p><strong>${plan.name}</strong>: ${plan.rate}% for ${plan.duration} days</p>`;
    });
}

// Update User Plan Selection Dropdown
function updateUserPlans() {
    const userPlanSelect = document.getElementById('userPlan');
    userPlanSelect.innerHTML = '';
    plans.forEach((plan, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = plan.name;
        userPlanSelect.add(option);
    });
}

// User Panel: Buy Plan and Calculate Profit
document.getElementById('depositForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const selectedPlanIndex = document.getElementById('userPlan').value;
    const depositAmount = parseFloat(document.getElementById('depositAmount').value);
    
    if (selectedPlanIndex === '') return;
    
    const selectedPlan = plans[selectedPlanIndex];
    
    const investment = {
        user: currentUser.username,
        plan: selectedPlan,
        amount: depositAmount,
        profit: calculateProfit(depositAmount, selectedPlan.rate, selectedPlan.duration)
    };
    
    investments.push(investment);
    displayInvestmentInfo(investment);
    
    this.reset();
});

// Calculate Profit
function calculateProfit(amount, rate, duration) {
    return (amount * (rate / 100)) * duration;
}

// Display User's Investment Information
function displayInvestmentInfo(investment) {
    const investmentInfo = document.getElementById('investmentInfo');
    
    investmentInfo.innerHTML = `
        <h3>Investment Details</h3>
        <p><strong>User:</strong> ${investment.user}</p>
        <p><strong>Plan:</strong> ${investment.plan.name}</p>
        <p><strong>Deposit Amount:</strong> $${investment.amount}</p>
        <p><strong>Expected Profit:</strong> $${investment.profit.toFixed(2)}</p>
        <p><strong>Duration:</strong> ${investment.plan.duration} days</p>
    `;
}
