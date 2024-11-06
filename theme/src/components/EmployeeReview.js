// src/components/EmployeeReview.js
import React, { useState } from 'react';
import { Typography, TextField, Button, Paper, Grid, Rating } from '@mui/material';
import './EmployeeReview.css';

const EmployeeReview = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  const handleRatingChange = (event, newValue) => {
    setRating(newValue);
  };

  const handleReviewChange = (event) => {
    setReview(event.target.value);
  };

  const handleSubmit = () => {
    alert(`Rating: ${rating} Stars\nReview: ${review}`);
    setRating(0);
    setReview('');
  };

  return (
    <div className="employee-review">
      <Typography variant="h4" align="center" className="review-title">
        Employee Review
      </Typography>
      <Paper elevation={3} className="review-form">
        <Grid container spacing={2}>
          <Grid item xs={12} className="rating-container">
            <Typography variant="h6" className="rating-label">Rating</Typography>
            <Rating
              name="employee-rating"
              value={rating}
              onChange={handleRatingChange}
              precision={1}
              size="large"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Write your review"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={review}
              onChange={handleReviewChange}
              className="review-textfield"
              placeholder="Provide additional feedback here"
            />
          </Grid>
          <Grid item xs={12} className="submit-button-container">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              className="submit-button"
            >
              Submit Review
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default EmployeeReview;
