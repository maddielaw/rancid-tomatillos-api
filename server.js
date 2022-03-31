const express = require('express');
const app = express();
app.use(express.json())
const cors = require('cors');
app.use(cors());
const { starredMovies } = require('./data')

// SETUP stuff
app.set('port', process.env.PORT || 3001);
app.locals.title = 'Rancid-Tomatillos-API';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.locals.starredMovies = starredMovies;


// GET all movies
// -> will fetch when user navigates to starred movies page (styling similar to main movie dashboard)

app.get('/api/v1/starredMovies', (request, response) => {
  const movies = app.locals.starredMovies;
  response.json({ movies })
})


// POST new favorite movie
// -> will send new POST request when user selects star on movie detail page

app.post('/api/v1/starredMovies', (request, response) => {
  const movie = request.body;

  for (let requiredParameter of ['id', 'title', 'poster_path']) {
    if (!movie[requiredParameter]) {
      response
        .status(422)
        .send({ error: `Expected format: { id: <Number>, title: <String>, poster_path: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  const { id, title, poster_path } = movie;
  app.locals.starredMovies.push({ id, title, poster_path });
  response.status(201).json({ id, title, poster_path });
});







