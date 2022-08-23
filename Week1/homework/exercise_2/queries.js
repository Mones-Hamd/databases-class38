import mysql2 from 'mysql2';
const schema = {
  host: '127.0.0.1',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world',
};
const db = mysql2.createConnection(schema);
db.connect();
const passQuery = (sql) => {
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};
const queries = [
  `SELECT Name FROM country WHERE Population > 8000000;`,
  `SELECT Name FROM country WHERE Name LIKE '%land%';`,
  `SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;`,
  `SELECT Name FROM country WHERE continent = 'Europe';`,
  `SELECT Name FROM country ORDER BY SurfaceArea DESC;`,
  `SELECT Name FROM city WHERE CountryCode = 'NLD';`,
  `SELECT Population FROM city WHERE Name = 'Rotterdam';`,
  `SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10;`,
  `SELECT Name FROM city ORDER BY Population DESC LIMIT 10;`,
  `SELECT SUM(Population) FROM country;`,
];
queries.forEach((query) => passQuery(query));
db.end();
