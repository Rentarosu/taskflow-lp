// Tab switching
document.querySelectorAll('.login-tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.login-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
  });
});

// Password toggle
document.querySelectorAll('.password-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const input = document.getElementById(btn.dataset.target);
    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = '\uD83D\uDE48';
    } else {
      input.type = 'password';
      btn.textContent = '\uD83D\uDC41';
    }
  });
});

// Password strength
const signupPassword = document.getElementById('signupPassword');
const strengthEl = document.getElementById('passwordStrength');
signupPassword.addEventListener('input', () => {
  const val = signupPassword.value;
  if (val.length === 0) { strengthEl.style.display = 'none'; return; }
  strengthEl.style.display = 'block';
  let score = 0;
  if (val.length >= 8) score++;
  if (/[a-z]/.test(val) && /[A-Z]/.test(val)) score++;
  if (/[0-9]/.test(val)) score++;
  if (/[^a-zA-Z0-9]/.test(val)) score++;

  const colors = ['#ef4444', '#f59e0b', '#06b6d4', '#059669'];
  const labels = ['\u5F31\u3044', '\u307E\u3042\u307E\u3042', '\u826F\u3044', '\u5F37\u3044'];
  const bars = strengthEl.querySelectorAll('.strength-bar');
  bars.forEach((bar, i) => {
    bar.style.background = i < score ? colors[score - 1] : 'var(--border)';
  });
  strengthEl.querySelector('.strength-text').textContent = labels[score - 1] || '';
  strengthEl.querySelector('.strength-text').style.color = colors[score - 1] || 'var(--text-light)';
});

// Clear errors on input
document.querySelectorAll('.form-input').forEach(el => {
  el.addEventListener('input', () => {
    el.classList.remove('error');
    const errEl = document.getElementById(el.id + 'Error');
    if (errEl) errEl.classList.remove('show');
  });
});

// Toast
let toastTimer;
function showToast(title, msg, type) {
  const toast = document.getElementById('toast');
  const icon = document.getElementById('toastIcon');
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastMsg').textContent = msg;
  icon.className = 'toast-icon ' + type;
  icon.textContent = type === 'error' ? '!' : '\u2713';
  toast.className = 'toast show ' + type;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 5000);
}
document.getElementById('toastClose').addEventListener('click', () => {
  document.getElementById('toast').classList.remove('show');
});

// Login form
document.getElementById('loginForm').addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  const email = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add('error');
    document.getElementById('loginEmailError').classList.add('show');
    valid = false;
  }
  if (password.value.trim() === '') {
    password.classList.add('error');
    document.getElementById('loginPasswordError').classList.add('show');
    valid = false;
  }
  if (!valid) return;

  const btn = document.getElementById('loginBtn');
  btn.classList.add('loading'); btn.disabled = true;
  setTimeout(() => {
    btn.classList.remove('loading'); btn.disabled = false;
    showToast('\u30ED\u30B0\u30A4\u30F3\u30A8\u30E9\u30FC', '\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u307E\u305F\u306F\u30D1\u30B9\u30EF\u30FC\u30C9\u304C\u6B63\u3057\u304F\u3042\u308A\u307E\u305B\u3093\u3002', 'error');
  }, 1500);
});

// Signup form
document.getElementById('signupForm').addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;
  const fields = [
    { id: 'signupLastName', check: v => v.trim() !== '' },
    { id: 'signupFirstName', check: v => v.trim() !== '' },
    { id: 'signupEmail', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'signupPassword', check: v => v.length >= 8 },
    { id: 'signupCompany', check: v => v.trim() !== '' },
  ];
  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const err = document.getElementById(f.id + 'Error');
    if (!f.check(el.value)) {
      el.classList.add('error'); if (err) err.classList.add('show');
      valid = false;
    } else {
      el.classList.remove('error'); if (err) err.classList.remove('show');
    }
  });
  const terms = document.getElementById('signupTerms');
  const termsErr = document.getElementById('signupTermsError');
  if (!terms.checked) { termsErr.classList.add('show'); valid = false; }
  else { termsErr.classList.remove('show'); }

  if (!valid) return;

  const btn = document.getElementById('signupBtn');
  btn.classList.add('loading'); btn.disabled = true;
  setTimeout(() => {
    btn.classList.remove('loading'); btn.disabled = false;
    showToast('\u30ED\u30B0\u30A4\u30F3\u30A8\u30E9\u30FC', '\u73FE\u5728\u65B0\u898F\u767B\u9332\u3092\u53D7\u3051\u4ED8\u3051\u3066\u304A\u308A\u307E\u305B\u3093\u3002\u304A\u554F\u3044\u5408\u308F\u305B\u30D5\u30A9\u30FC\u30E0\u3088\u308A\u3054\u9023\u7D61\u304F\u3060\u3055\u3044\u3002', 'error');
  }, 1500);
});

// Social login buttons
['googleLogin','msLogin','googleSignup','msSignup'].forEach(id => {
  document.getElementById(id).addEventListener('click', () => {
    showToast('\u30ED\u30B0\u30A4\u30F3\u30A8\u30E9\u30FC', '\u30BD\u30FC\u30B7\u30E3\u30EB\u30ED\u30B0\u30A4\u30F3\u306F\u73FE\u5728\u30E1\u30F3\u30C6\u30CA\u30F3\u30B9\u4E2D\u3067\u3059\u3002\u30E1\u30FC\u30EB\u30A2\u30C9\u30EC\u30B9\u3067\u30ED\u30B0\u30A4\u30F3\u3057\u3066\u304F\u3060\u3055\u3044\u3002', 'error');
  });
});

// Forgot password
const forgotModal = document.getElementById('forgotModal');
document.getElementById('forgotLink').addEventListener('click', (e) => {
  e.preventDefault();
  forgotModal.classList.add('show');
});
document.getElementById('forgotClose').addEventListener('click', () => {
  forgotModal.classList.remove('show');
  // Reset state
  document.getElementById('resetForm').classList.remove('hide');
  document.getElementById('resetSent').classList.remove('show');
});
forgotModal.addEventListener('click', (e) => {
  if (e.target === forgotModal) {
    forgotModal.classList.remove('show');
    document.getElementById('resetForm').classList.remove('hide');
    document.getElementById('resetSent').classList.remove('show');
  }
});

document.getElementById('resetFormEl').addEventListener('submit', (e) => {
  e.preventDefault();
  const email = document.getElementById('resetEmail');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add('error');
    document.getElementById('resetEmailError').classList.add('show');
    return;
  }
  const btn = document.getElementById('resetBtn');
  btn.classList.add('loading'); btn.disabled = true;
  setTimeout(() => {
    btn.classList.remove('loading'); btn.disabled = false;
    document.getElementById('resetForm').classList.add('hide');
    document.getElementById('resetSent').classList.add('show');
  }, 1200);
});
