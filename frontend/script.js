document.addEventListener('DOMContentLoaded', () => {
  // Handle signup form submission
  const signupForm = document.getElementById('signupForm');
  if (signupForm) {
    signupForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('http://localhost:5000/api/auth/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, email, password }),
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('username', data.user.username);
          window.location.href = 'homepage.html';
        } else {
          const data = await res.json();
          alert('Signup failed: ' + data.msg);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    });
  }

  // Handle login form submission
  const loginForm = document.getElementById('loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          localStorage.setItem('username', data.user.username);
          window.location.href = 'homepage.html';
        } else {
          const data = await res.json();
          alert('Login failed: ' + data.msg);
        }
      } catch (err) {
        console.error('Error:', err);
      }
    });
  }

  // Display username on homepage
  const usernameDisplay = document.getElementById('usernameDisplay');
  if (usernameDisplay) {
    const username = localStorage.getItem('username');
    if (username) {
      usernameDisplay.textContent = username;
    } else {
      window.location.href = 'login.html';
    }
  }
});