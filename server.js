const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

app.use(cors());

// Serve the static files (index.html, css, js) from this folder
app.use(express.static(path.join(__dirname)));

// Optional: ensure the root route serves index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));