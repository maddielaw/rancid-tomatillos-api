const express = require('express');
const app = express();
app.use(express.json())
const cors = require('cors');
app.use(cors());
const { starredMovies } = require('./data')

app.set('port', process.env.PORT || 3001);
app.locals.title = 'Rancid-Tomatillos-API';

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on http://localhost:${app.get('port')}.`);
});

app.locals.starredMovies = starredMovies;

app.get('/api/v1/starredMovies', (request, response) => {
  const movies = app.locals.starredMovies;
  response.json({ movies })
})

app.post('/api/v1/starredMovies', (request, response) => {
  const movie = request.body;

  for (let requiredParameter of ['id', 'title', 'poster_path']) {
    if (!movie[requiredParameter]) {
      response
        .status(422)
        .send({ error: `Expected format: { id: <Number>, title: <String>, poster_path: <String> }. You're missing a "${requiredParameter}" property.` });
    }
  }

  if (app.locals.starredMovies.find(starMovie => starMovie.id === movie.id)) {
    return response
      .status(422)
      .send({ error: `A movie with "${starMovie.id}" already exists.` });
  }
  
  const { id, title, poster_path } = movie;
  app.locals.starredMovies.push({ id, title, poster_path });
  response.status(201).json({ id, title, poster_path });
});







