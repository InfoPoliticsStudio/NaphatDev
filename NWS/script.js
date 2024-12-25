// Scroll to section on button click
document.getElementById("explore-btn").addEventListener("click", function() {
  document.querySelector("#about").scrollIntoView({ behavior: 'smooth' });
});

// Toggle sidebar
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', function() {
  sidebar.classList.toggle('open');
});

// Scroll to section on button click
document.getElementById("explore-btn").addEventListener("click", function() {
  document.querySelector("#about").scrollIntoView({ behavior: 'smooth' });
});
