# havis

[Node.js ohjelmointiprojekti (582380)](https://www.cs.helsinki.fi/courses/582380/2017/v/k/1) [![Build Status](https://travis-ci.org/tzpr/havis.png)](https://travis-ci.org/tzpr/havis)

Noden päällä pyörivä palvelinsovellus lintuhavaintojen tallentamiseen. 

Tarjoaa REST-rajapinnan jota voi käyttää erinäisillä asiakassovelluksilla.

Rajapinnan dokumentaatio: https://havis-node.herokuapp.com/documentation#/

[Tuntikirjanpito](https://docs.google.com/spreadsheets/d/1K8Glpp1wciou_UHgp79Y9SB7gtdhW1nfxqMcIz5VTb4/edit?usp=sharing)

Sovellus Herokussa: https://havis-node.herokuapp.com/

### Asennus

1. Asenna Node.js (jos ei jo ole koneelle asennettuna)

2. Asenna MongoDB (jos ei jo ole koneelle asennettuna)

3. Kloonaa projekti omalle koneelle. 

4. Mene havis-hakemistoon ja suorita komento npm install.

5. Käynnistä solvellus komennolla npm start.

Sovellus tarvitsee paikallisen MongoDb-tietokannan. 

Projektin hakemistossa /data/test-data-dump on esimerkkidataa, jonka voi tallentaa paikalliseen kantaan komennolla:
```
mongorestore -d havisMongo -c observations observations.bson 
```
Komento kannattaa suorittaa /data/test-data-dump -hakemistossa.

### Testit

Suorita API-testit komennolla npm test projektin juuressa.


### Linkkejä aiheeseen liittyen
- web framework: [hapi.js](https://hapijs.com/)

- validation: [joi](https://github.com/hapijs/joi)

- CI tool: [Travis CI with Node.js](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/)

- Data modeling: http://mongoosejs.com/

- Node.js test framework: [lab](https://github.com/hapijs/lab)

- Test Assertion library: [code](https://github.com/hapijs/code)

- About API design: https://github.com/dwyl/learn-api-design

- README writing and formatting syntax: [Writing on GitHub](https://help.github.com/articles/basic-writing-and-formatting-syntax/)
