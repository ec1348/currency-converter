const express = require('express');  
const app = express();  
const PORT = 3000;
const bodyParser = require('body-parser')

app.use(bodyParser.json())

app.get('/', (req, res) => { res.send('Hello, This is bring home test!'); });

require('./app/routes/currencyExchangeService.routes')(app);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});