

// app.js
// Connect the HTML form to the Express endpoint using Fetch.

document.addEventListener('DOMContentLoaded', () => {
  // Prefer a specific form id if you have one; otherwise fall back to the first form.
  const form = document.querySelector('#patient-form') || document.querySelector('form');

  if (!form) {
    console.warn('No form found on the page. Add a <form> element or set id="patient-form".');
    return;
  }

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // stop refresh

    // Collect all inputs (requires each input/select/textarea to have a name="..." attribute)
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('/api/register-patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      // If server returns non-2xx, still try to read message
      let result;
      try {
        result = await response.json();
      } catch (e) {
        result = { message: 'Server response was not JSON.' };
      }

      if (!response.ok) {
        alert(result.message || `Registration failed (HTTP ${response.status}).`);
        return;
      }

      alert(result.message || 'Registration successful!');

      // Optional: reset the form after a successful submit
      form.reset();
    } catch (err) {
      console.error('Fetch error:', err);
      alert('Could not reach the server. Is server.js running on http://localhost:3000 ?');
    }
  });
});