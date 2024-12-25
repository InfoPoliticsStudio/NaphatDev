// Toggle sidebar and switch icon between ☰ and X
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', function() {
  sidebar.classList.toggle('open');
  // Toggle between fa-bars (☰) and fa-times (X)
  if (sidebar.classList.contains('open')) {
    menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Change to 'X' when sidebar is open
  } else {
    menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Change back to '☰' when sidebar is closed
  }
});

// Scroll to section on button click
document.getElementById("explore-btn").addEventListener("click", function() {
  document.querySelector("#about").scrollIntoView({ behavior: 'smooth' });
});
