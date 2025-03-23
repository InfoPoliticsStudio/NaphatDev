
        // Fetch data from the provided Google Apps Script URL
        fetch('https://script.google.com/macros/s/AKfycbykLv_7VvZRlYv4dkjagWr2iZYGI8_8foC6ic1106Wn66WELDWVzkNoQFZjhCIM8YMu/exec')
            .then(response => response.json())  // Parse the JSON response
            .then(data => {
                // Select the tbody inside #score-tcas68
                const tableBody = document.querySelector('#score-tcas68 tbody');

                // Loop through the data and create rows for each item
                data.forEach(item => {
                    const row = document.createElement('tr');

                    const subjectCell = document.createElement('td');
                    subjectCell.classList.add('align-middle', '_heading');
                    subjectCell.innerHTML = `<b>${item.subject}</b>`;
                    
                    const scoreCell = document.createElement('td');
                    scoreCell.classList.add('align-middle', '_heading');
                    scoreCell.innerHTML = `<center>${item.score}</center>`;
                    
                    const tScoreCell = document.createElement('td');
                    tScoreCell.classList.add('align-middle', '_heading');
                    tScoreCell.innerHTML = `<center>${item.tScore}</center>`;
                    
                    const percentileCell = document.createElement('td');
                    percentileCell.classList.add('align-middle', '_heading');
                    percentileCell.innerHTML = `<center>${item.percentile}</center>`;

                    // Append cells to the row
                    row.appendChild(subjectCell);
                    row.appendChild(scoreCell);
                    row.appendChild(tScoreCell);
                    row.appendChild(percentileCell);

                    // Append the row to the table body
                    tableBody.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
