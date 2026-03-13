// Character count
const message = document.getElementById('message');
const charCount = document.getElementById('charCount');
message.addEventListener('input', () => {
  const len = message.value.length;
  charCount.textContent = len;
  if (len > 2000) {
    message.value = message.value.substring(0, 2000);
    charCount.textContent = 2000;
  }
});

// Clear error on input
document.querySelectorAll('.form-input, .form-select, .form-textarea').forEach(el => {
  el.addEventListener('input', () => {
    el.classList.remove('error');
    const errorEl = document.getElementById(el.id + 'Error');
    if (errorEl) errorEl.classList.remove('show');
  });
});
document.getElementById('privacy').addEventListener('change', () => {
  document.getElementById('privacyError').classList.remove('show');
});

// Validation & Submit
const form = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const modal = document.getElementById('successModal');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  let valid = true;

  const fields = [
    { id: 'lastName', errorId: 'lastNameError', check: v => v.trim() !== '' },
    { id: 'firstName', errorId: 'firstNameError', check: v => v.trim() !== '' },
    { id: 'company', errorId: 'companyError', check: v => v.trim() !== '' },
    { id: 'email', errorId: 'emailError', check: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    { id: 'teamSize', errorId: 'teamSizeError', check: v => v !== '' },
    { id: 'inquiry', errorId: 'inquiryError', check: v => v !== '' },
    { id: 'message', errorId: 'messageError', check: v => v.trim() !== '' },
  ];

  fields.forEach(f => {
    const el = document.getElementById(f.id);
    const errEl = document.getElementById(f.errorId);
    if (!f.check(el.value)) {
      el.classList.add('error');
      errEl.classList.add('show');
      valid = false;
    } else {
      el.classList.remove('error');
      errEl.classList.remove('show');
    }
  });

  const privacy = document.getElementById('privacy');
  const privacyErr = document.getElementById('privacyError');
  if (!privacy.checked) {
    privacyErr.classList.add('show');
    valid = false;
  } else {
    privacyErr.classList.remove('show');
  }

  if (!valid) {
    const firstError = form.querySelector('.error, .form-error-msg.show');
    if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return;
  }

  // Simulate submission
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;

  setTimeout(() => {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
    modal.classList.add('show');
    form.reset();
    charCount.textContent = '0';
  }, 1500);
});

// Close modal on overlay click
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('show');
});
