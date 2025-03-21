document.addEventListener("DOMContentLoaded", function () {
    const salesData = [
        { day: "Sun", hour: 8, count: 2 },
        { day: "Mon", hour: 11, count: 4 },
        { day: "Tue", hour: 2, count: 1 },
        { day: "Wed", hour: 5, count: 3 },
        { day: "Thu", hour: 8, count: 2 },
        { day: "Fri", hour: 11, count: 4 },
        { day: "Sat", hour: 2, count: 3 },
    ];

    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const grid = document.getElementById("salesHeatmap");

    for (let d = 0; d < 7; d++) {
        for (let h = 0; h < 24; h++) {
            let cell = document.createElement("div");
            cell.classList.add("heatmap-cell");

            let sale = salesData.find(s => s.day === days[d] && s.hour === h);
            if (sale) cell.dataset.sales = sale.count;

            grid.appendChild(cell);
        }
    }
});
