const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path')
const axios = require('axios');
const { marked } = require('marked')

const app = express();
const port = 3000;

app.use(express.json());

const upload = multer({ dest: 'uploads/' });

const notes = {};

app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) return res.status(400).send('No file uploaded.');

  const filePath = path.join(__dirname, file.path);
  const content = fs.readFileSync(filePath, 'utf-8');

  notes[file.originalname] = content;
  
  fs.unlinkSync(filePath)
  console.log(`File saved at: ${file.path}`);

  res.status(200).send({ message: 'File uploaded successfully', fileName: file.originalname })
});

app.post('/notes', (req, res) => {
  const { fileName, content } = req.body;
  if (!fileName || !content) res.status(400).send('File name and content are required');

  notes[fileName] = content;
  res.status(200).send({ message: 'Note saved successfully', fileName });
});

app.get('/notes', (req, res) => {
  const fileNames = Object.keys(notes);
  res.status(200).json(fileNames);
});

app.post('/notes/:fileName/grammar', async (req, res) => {
  const { fileName } = req.params;
  const content = notes[fileName];

  try {
    const response = await axios.post(
      'https://api.languagetoolplus.com/v2/check', 
      {
        language: 'en-US',
        text: content
      }
    )
    res.status(200).send(response.data.matches);
  } catch (err) {
    res.status(500).send({ message: 'Error checking grammar', error: err.message });
  }
});

app.get('/notes/:fileName/html', (req, res) => {
  const { fileName } = req.params;
  const content = notes[fileName];
  if (!content) return res.status(404).send('Note not found');

  const html = marked(content);
  res.status(200).send(html);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})