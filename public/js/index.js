/* eslint-disables */
import '@babel/polyfill';
import { displayMap } from './mapbox';
import { login, logout, signup } from './login';
import { updateSettings } from './updateSettings';
import { bookTour } from './stripe';
import { createReview } from './review';
import { showAlert } from './alerts';

// DOM ELEMENTS
const mapBox = document.getElementById('map');
const loginForm = document.querySelector('.form--login');
const signupForm = document.querySelector('.form--signup');
const logOutBtn = document.querySelector('.nav__el--logout');
const userDataForm = document.querySelector('.form-user-data');
const userPasswordForm = document.querySelector('.form-user-password');
const bookBtn = document.getElementById('book-tour');
const reviewForm = document.querySelector('.form--review');

// VALUES

// DELEGATION
if (mapBox) {
  const locations = JSON.parse(mapBox.dataset.locations);
  displayMap(locations);
}

if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    login(email, password);
  });
}

if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    if (password !== passwordConfirm) {
      showAlert('error', 'Passwords do not match.');
      return;
    }

    signup(name, email, password, passwordConfirm);
  });
}

if (logOutBtn) logOutBtn.addEventListener('click', logout);

if (userDataForm) {
  const photoInput = document.getElementById('photo');
  const photoPreview = document.querySelector('.form__user-photo');
  const profileStatus = document.querySelector('[data-profile-status]');
  const profileSubmit = document.querySelector('[data-profile-submit]');
  let previewUrl;

  const getPhotoUrl = (photo) =>
    photo && photo.startsWith('http')
      ? photo
      : `/img/users/${photo || 'default.jpg'}`;

  const setProfileStatus = (message, type = 'neutral') => {
    profileStatus.textContent = message;
    profileStatus.className = `form__status form__status--${type}`;
  };

  photoInput.addEventListener('change', () => {
    const [file] = photoInput.files;
    if (!file) {
      setProfileStatus('No new photo selected.');
      return;
    }

    if (!file.type.startsWith('image/')) {
      photoInput.value = '';
      setProfileStatus('Please choose an image file.', 'error');
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      photoInput.value = '';
      setProfileStatus('Image must be smaller than 5 MB.', 'error');
      return;
    }

    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrl = URL.createObjectURL(file);
    photoPreview.src = previewUrl;
    setProfileStatus(`${file.name} selected. Click Save settings to upload.`, 'ready');
  });

  userDataForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const form = new FormData();
    form.append('name', document.getElementById('name').value);
    form.append('email', document.getElementById('email').value);
    if (photoInput.files[0]) form.append('photo', photoInput.files[0]);

    profileSubmit.disabled = true;
    profileSubmit.textContent = 'Saving...';
    setProfileStatus(
      photoInput.files[0] ? 'Uploading your photo...' : 'Saving your settings...',
      'loading',
    );

    const updatedUser = await updateSettings(form, 'data');
    profileSubmit.disabled = false;
    profileSubmit.textContent = 'Save settings';

    if (updatedUser) {
      if (updatedUser.photo) {
        const updatedPhotoUrl = getPhotoUrl(updatedUser.photo);
        document
          .querySelectorAll('.form__user-photo, .nav__user-img')
          .forEach((image) => {
            image.src = updatedPhotoUrl;
          });
      }

      setProfileStatus('Profile updated successfully.', 'success');
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      previewUrl = undefined;
      photoInput.value = '';
    } else {
      setProfileStatus(
        'Profile update failed. Check the error message and try again.',
        'error',
      );
    }
  });
}

if (userPasswordForm)
  userPasswordForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';

    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;

    await updateSettings(
      { passwordCurrent, password, passwordConfirm },
      'password',
    );

    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
  });

if (bookBtn)
  bookBtn.addEventListener('click', (e) => {
    e.target.textContent = 'Processing...';
    const { tourId } = e.target.dataset;
    bookTour(tourId);
  });

if (reviewForm) {
  const ratingInputs = reviewForm.querySelectorAll('.star-rating__input');
  const ratingLabels = reviewForm.querySelectorAll('.star-rating__label');

  ratingInputs.forEach((input, index) => {
    input.addEventListener('change', () => {
      ratingLabels.forEach((label, labelIndex) => {
        label.classList.toggle('is-selected', labelIndex <= index);
      });
    });
  });

  reviewForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const { tourId } = reviewForm.dataset;
    const review = document.getElementById('review-text').value;
    const rating = reviewForm.querySelector('input[name="rating"]:checked');

    if (!rating) {
      showAlert('error', 'Please choose a rating.');
      return;
    }

    createReview(tourId, review, rating.value);
  });
}

const alertMessage = document.querySelector('body').dataset.alert;
if (alertMessage) showAlert('success', alertMessage, 20);
