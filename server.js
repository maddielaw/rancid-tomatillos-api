const express = require('express');
const app = express();
app.use(express.json())
const cors = require('cors');
app.use(cors());


app.set('port', process.env.PORT || 3001);

app.locals.title = 'Rancid-Tomatillos-API';


app.get('/', (request, response) => {
  response.send('well hello there');
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});