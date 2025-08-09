const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const FILE_PATH = './characters.json';

const readData = () => {
  const data = fs.readFileSync(FILE_PATH);
  return JSON.parse(data).characters;
};

const writeData = (characters) => {
  fs.writeFileSync(FILE_PATH, JSON.stringify({ characters }, null, 2));
};

app.get('/characters', (req, res) => {
  res.json(readData());
});

app.post('/characters', (req, res) => {
  const characters = readData();
  const newCharacter = { id: Date.now(), ...req.body };
  characters.push(newCharacter);
  writeData(characters);
  res.status(201).json(newCharacter);
});

app.delete('/characters/:id', (req, res) => {
  const characters = readData();
  const filtered = characters.filter(c => c.id != req.params.id);
  writeData(filtered);
  res.sendStatus(204);
});

app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
