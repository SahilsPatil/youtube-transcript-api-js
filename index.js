const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
  res.send('YouTube Transcript API is running!');
});

app.post('/transcript', async (req, res) => {
  const { videoId } = req.body;

  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    res.json({ transcript });
  } catch (error) {
    res.status(500).json({
      error: 'Failed to fetch transcript',
      details: error.message,
    });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
