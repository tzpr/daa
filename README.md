# havis

[Node.js ohjelmointiprojekti (582380)](https://www.cs.helsinki.fi/courses/582380/2017/v/k/1) [![Build Status](https://travis-ci.org/tzpr/havis.png)](https://travis-ci.org/tzpr/havis)

Noden päällä pyörivä palvelinsovellus lintuhavaintojen tallentamiseen. 

Tarjoaa REST-rajapinnan jota voi käyttää erinäisillä asiakassovelluksilla.

[Tuntikirjanpito](https://docs.google.com/spreadsheets/d/1NBLY_1rivcEe-nJNlVcYG_qPZA2MytAvqKgr4fHQSiY/edit?usp=sharing)

Sovellus Herokussa: https://havis-node.herokuapp.com/

### Asennus
1. Kloonaa projekti omalle koneelle. 

2. Mene havis-hakemistoon ja suorita komento npm install.

3. Käynnistä solvellus komennolla npm start.

### Testit
- [lab, Node.js test framework](https://github.com/hapijs/lab)

- [code, BDD Assertion library](https://github.com/hapijs/code)

Suorita API-testit komennolla npm test projektin juuressa.


### Esimerkkikäyttötapauksia [Curl](https://curl.haxx.se/)-kutsuina

- GET-pyyntö /observations/{year} polkuun palauttaa parametrina annetun vuoden havainnot JSON-muodossa.
```
curl https://havis-node.herokuapp.com/observations/2017
```

### Links
- web framework: [hapi.js](https://hapijs.com/)

- validation: [joi](https://github.com/hapijs/joi)

- CI tool: [Travis CI with Node.js](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)

- [Writing on GitHub, basic writing and formatting syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax/)

- https://github.com/dwyl/learn-api-design
