let currentSection = 0;
const sections = document.querySelectorAll('.section');

function scrollToSection(index) {
    sections[index].scrollIntoView({ behavior: 'smooth' });
}

window.addEventListener('wheel', (event) => {
    if (event.deltaY > 0) {
        if (currentSection < sections.length - 1) {
            currentSection++;
            scrollToSection(currentSection);
        }
    } else {
        if (currentSection > 0) {
            currentSection--;
            scrollToSection(currentSection);
        }
    }
    event.preventDefault();
});
