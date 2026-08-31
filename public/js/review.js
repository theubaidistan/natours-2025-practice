/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';

export const createReview = async (tourId, review, rating) => {
  try {
    await axios({
      method: 'POST',
      url: `/api/v1/tours/${tourId}/reviews`,
      data: { review, rating },
    });

    showAlert('success', 'Review submitted successfully!');
    window.setTimeout(() => window.location.reload(), 1000);
  } catch (err) {
    showAlert(
      'error',
      err.response?.data?.message || 'Unable to submit your review. Try again.',
    );
  }
};
