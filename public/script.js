document.addEventListener('DOMContentLoaded', () => {
    // API call to fetch crypto data
    fetch('/get-crypto')
        .then(response => response.json())
        .then(data => populateTable(data))
        .catch(err => console.error('Error fetching data:', err));

    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.addEventListener('change', () => {
        document.body.classList.toggle('light-mode');
        document.body.classList.toggle('dark-mode');
    });
});

function populateTable(data) {
    const tableBody = document.getElementById('crypto-data');

    data.forEach((crypto, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${crypto.name}</td>
            <td>₹ ${crypto.last}</td>
            <td>₹ ${crypto.buy} / ₹ ${crypto.sell}</td>
            <td>${crypto.volume}%</td>
            <td>₹ ${crypto.base_unit}</td>
        `;

        tableBody.appendChild(row);
    });
}
