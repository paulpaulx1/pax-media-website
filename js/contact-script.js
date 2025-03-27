document.addEventListener('DOMContentLoaded', function () {
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // Validate form
    if (!name || !email || !message) {
      showMessage('Please fill in all fields', 'error');
      return;
    }

    // Validate email format
    if (!validateEmail(email)) {
      showMessage('Please enter a valid email address', 'error');
      return;
    }

    // If validation passes, you would normally send the data to a server here
    // For now we'll just show a success message
    sendFormData(name, email, message);
  });

  function validateEmail(email) {
    const re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  function showMessage(message, type) {
    formStatus.textContent = message;
    formStatus.className = 'form-status ' + type;

    // Hide the message after 3 seconds
    setTimeout(() => {
      formStatus.style.display = 'none';
    }, 3000);
  }

  function sendFormData(name, email, message) {
    // In a real implementation, you would send the data to a server here
    // For example, using fetch() API:

    // Simulating form submission success
    showMessage('Thank you! Your message has been sent.', 'success');
    contactForm.reset();
  }
});
