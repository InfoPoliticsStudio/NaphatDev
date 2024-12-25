// Toggle sidebar and switch icon between ☰ and X with transition
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');
const menuIcon = menuToggle.querySelector('i');

menuToggle.addEventListener('click', function() {
  sidebar.classList.toggle('open');
  
  // Add transition to icon change
  if (sidebar.classList.contains('open')) {
    menuIcon.style.transform = 'rotate(180deg)'; // Rotate the icon when sidebar opens
    menuIcon.classList.remove('fa-bars');
    menuIcon.classList.add('fa-times');
  } else {
    menuIcon.style.transform = 'rotate(0deg)'; // Reset rotation when sidebar closes
    menuIcon.classList.remove('fa-times');
    menuIcon.classList.add('fa-bars');
  }
});

// Scroll to section on button click
document.getElementById("explore-btn").addEventListener("click", function() {
  document.querySelector("#about").scrollIntoView({ behavior: 'smooth' });
});
