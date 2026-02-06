document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('.page-section');
  const sidebarElement = document.getElementById('sidebar');
  const maintenanceForm = document.getElementById('maintenanceForm');

  // Page Navigation Logic
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = link.getAttribute('data-page');

      // 1. Update Active Section
      sections.forEach(section => {
        section.classList.remove('active');
        if (section.id === targetPage) {
          section.classList.add('active');
        }
      });

      // 2. Update Active Nav Link
      navLinks.forEach(nav => nav.parentElement.classList.remove('active'));
      link.parentElement.classList.add('active');

      // 3. Close Sidebar (Bootstrap instance)
      const instance = bootstrap.Offcanvas.getInstance(sidebarElement);
      if (instance) instance.hide();
    });
  });

  // Handle Form Submission
  if (maintenanceForm) {
    maintenanceForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Request submitted successfully to Maintenance!');
      maintenanceForm.reset();
    });
  }
});