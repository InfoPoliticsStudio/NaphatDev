document.addEventListener("DOMContentLoaded", function () {
    // Dummy Sales Data (Replace with Database Fetch)
    let salesData = [
        { day: "Mon", hour: 9, count: 2 },
        { day: "Mon", hour: 14, count: 4 },
        { day: "Tue", hour: 10, count: 1 },
        { day: "Wed", hour: 11, count: 3 },
        { day: "Thu", hour: 15, count: 2 },
        { day: "Fri", hour: 16, count: 4 },
        { day: "Sat", hour: 12, count: 3 },
        { day: "Sun", hour: 18, count: 1 },
    ];

    let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    let grid = document.getElementById("salesHeatmap");

    // Generate Heatmap
    for (let d = 0; d < 7; d++) {
        for (let h = 0; h < 24; h++) {
            let cell = document.createElement("div");
            cell.classList.add("heatmap-cell");
            
            // Match sales data
            let sale = salesData.find(s => s.day === days[d] && s.hour === h);
            if (sale) {
                cell.dataset.sales = sale.count;
            }

            grid.appendChild(cell);
        }
    }
});
