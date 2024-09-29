// Function to calculate EMI, Principal, Interest and update UI
function calculateEMI() {
    const loanAmount = parseFloat(document.getElementById('loanAmountInput').value);
    const interestRate = parseFloat(document.getElementById('interestRateInput').value) / 12 / 100;
    const loanTenure = parseFloat(document.getElementById('loanTenureInput').value) * 12;

    const emi = loanAmount * interestRate * (Math.pow(1 + interestRate, loanTenure)) / (Math.pow(1 + interestRate, loanTenure) - 1);
    const totalAmount = emi * loanTenure;
    const interestAmount = totalAmount - loanAmount;

    document.getElementById('emiAmount').innerText = `₹${emi.toFixed(2)}`;
    document.getElementById('principalAmount').innerText = `₹${loanAmount.toFixed(2)}`;
    document.getElementById('interestAmount').innerText = `₹${interestAmount.toFixed(2)}`;
    document.getElementById('totalAmount').innerText = `₹${totalAmount.toFixed(2)}`;

    // Update Highcharts pie chart
    initChart(loanAmount, interestAmount);
}

// Syncing the loan amount text input and slider
function updateLoanAmount() {
    const loanAmount = document.getElementById('loanAmountSlider').value;
    document.getElementById('loanAmountInput').value = loanAmount;
    calculateEMI();
}

function syncLoanAmountWithInput() {
    const loanAmount = document.getElementById('loanAmountInput').value;
    document.getElementById('loanAmountSlider').value = loanAmount;
    calculateEMI();
}

// Syncing the interest rate input and slider
function updateInterestRate() {
    const interestRate = document.getElementById('interestRateSlider').value;
    document.getElementById('interestRateInput').value = interestRate;
    calculateEMI();
}

function syncInterestRateWithInput() {
    const interestRate = document.getElementById('interestRateInput').value;
    document.getElementById('interestRateSlider').value = interestRate;
    calculateEMI();
}

// Syncing the loan tenure input and slider
function updateLoanTenure() {
    const loanTenure = document.getElementById('loanTenureSlider').value;
    document.getElementById('loanTenureInput').value = loanTenure;
    calculateEMI();
}

function syncLoanTenureWithInput() {
    const loanTenure = document.getElementById('loanTenureInput').value;
    document.getElementById('loanTenureSlider').value = loanTenure;
    calculateEMI();
}

// Initialize the Highcharts pie chart
function initChart(principal, interest) {
    loanChart = Highcharts.chart('loanChartContainer', {
        chart: {
            type: 'pie',
        },
        title: {
            text: 'Loan Distribution'
        },
        tooltip: {
            valueSuffix: ' ₹'
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20
                }, {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.2f}%',
                    style: {
                        fontSize: '1em',
                        textOutline: 'none',

                        opacity: 0.7
                    },

                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 10
                    }
                }]
            }
        },
        series: [{
            name: 'Amount',
            colorByPoint: true,
            data: [
                {
                    name: 'Principal',
                    y: principal,
                    color: '#D65B5B',
                },
                {
                    name: 'Interest',
                    sliced: true,
                    selected: true,
                    y: interest,
                    color: '#4B5563',
                }]
        }]
    });
}


// Initialize the chart and EMI values on page load
window.onload = calculateEMI;
