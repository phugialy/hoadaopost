const express = require('express');
const router = express.Router();

// Example endpoint
router.get('/hello', (req, res) => {
  res.json({ message: 'Hello from the API!' });
});

module.exports = router;
