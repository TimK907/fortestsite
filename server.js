const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(__dirname)); // віддає index.html як статичний

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
