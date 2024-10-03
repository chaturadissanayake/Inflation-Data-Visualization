document.addEventListener('DOMContentLoaded', function () {
    const ctx = document.getElementById('myComboChart').getContext('2d');

    const labels = [
        'Jan 2022', 'Feb 2022', 'Mar 2022', 'Apr 2022', 'May 2022', 'Jun 2022',
        'Jul 2022', 'Aug 2022', 'Sep 2022', 'Oct 2022', 'Nov 2022', 'Dec 2022',
        'Jan 2023', 'Feb 2023', 'Mar 2023', 'Apr 2023', 'May 2023', 'Jun 2023',
        'Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023',
        'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024'
    ];

    const ccpiData = [
        14.2, 15.1, 18.7, 29.8, 39.1, 54.6, 60.8, 64.3, 69.8, 66.0, 61.0, 57.2, 
        51.7, 50.6, 50.3, 35.3, 25.2, 12.0, 6.3, 4.0, 1.3, 1.5, 3.4, 4.0,       
        6.4, 5.9, 0.9, 1.5, 0.9                                                   
    ];

    const ncpiData = [
        9.9, 10.9, 13.0, 22.0, 28.4, 39.9, 44.3, 46.6, 50.2, 49.7, 49.4, 47.7,  
        45.6, 43.6, 39.1, 27.8, 20.3, 9.8, 5.9, 4.6, 1.9, 1.2, 0.8, 0.6,       
        2.2, 2.8, 3.1, 3.4, 3.5                                                  
    ];

    let realWageData = new Array(labels.length).fill(0);

    const comboChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Colombo Consumer Price Index (CCPI)',
                    data: ccpiData,
                    type: 'line',
                    borderColor: '#36A2EB',
                    backgroundColor: '#36A2EB',
                    fill: false,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'National Consumer Price Index (NCPI)',
                    data: ncpiData,
                    type: 'line',
                    borderColor: '#FF6384',
                    backgroundColor: '#FF6384',
                    fill: false,
                    tension: 0.4,
                    yAxisID: 'y'
                },
                {
                    label: 'Real Wage Comparison',
                    data: realWageData,
                    backgroundColor: '#4BC0C0',
                    borderColor: 'transparent',
                    borderWidth: 0,
                    yAxisID: 'y1'
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    position: 'left',
                    title: {
                        display: true,
                        text: 'Inflation (%)'
                    }
                },
                y1: {
                    beginAtZero: false,
                    position: 'right',
                    title: {
                        display: true,
                        text: 'Real Wage (Rs)'
                    }
                }
            },
            plugins: {
                legend: {
                    labels: {
                        boxWidth: 20,
                        usePointStyle: true
                    }
                }
            }
        }
    });

    const calculateWage = () => {
        const janSalary = parseFloat(document.getElementById('jan-salary').value);
        const currentSalary = parseFloat(document.getElementById('current-salary').value);

        if (janSalary && currentSalary) {
            realWageData = ccpiData.map((inflation) => {
                return currentSalary * (1 - inflation / 100);
            });

            comboChart.data.datasets[2].data = realWageData;
            comboChart.update();
        } else {
            alert('Please enter both 2022 January salary and current salary.');
        }
    };

    document.getElementById('calculate-btn').addEventListener('click', calculateWage);
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Enter') {
            calculateWage();
        }
    });
});
