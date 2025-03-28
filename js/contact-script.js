document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contactForm');
  const result = document.getElementById('result');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const formData = new FormData(form);
    const object = Object.fromEntries(formData);
    const json = JSON.stringify(object);
    result.innerHTML = 'Please wait...';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: json,
    })
      .then(async (response) => {
        let json = await response.json();
        if (response.status == 200) {
          result.innerHTML = json.message;
          result.style.backgroundColor = 'rgba(121, 197, 192, 0.1)';
          result.style.color = 'var(--light-blue)';
        } else {
          console.log(response);
          result.innerHTML = json.message;
          result.style.backgroundColor = 'rgba(224, 93, 68, 0.1)';
          result.style.color = 'var(--coral)';
        }
      })
      .catch((error) => {
        console.log(error);
        result.innerHTML = 'Something went wrong!';
        result.style.backgroundColor = 'rgba(224, 93, 68, 0.1)';
        result.style.color = 'var(--coral)';
      })
      .then(function () {
        form.reset();
        setTimeout(() => {
          result.style.display = 'none';
        }, 5000);
      });
  });
});
