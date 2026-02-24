const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve the static files (index.html, css, js) from the public folder
app.use(express.static(path.join(__dirname, 'public')));

app.post('/api/register-patient', (req, res) => {
  const patientData = req.body;
  console.log("New Patient Received:", patientData);
  res.status(200).send({ message: "Registration successful!" });
});

// Ensure the root route serves the public/index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));