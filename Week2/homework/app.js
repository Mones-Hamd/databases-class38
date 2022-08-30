import mysql from 'mysql';
import { sql } from './creatTables.js';
import { author, researcher, research_papbers } from './mockData.js';
const connectionConfig = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
};

const db = mysql.createConnection(connectionConfig);

//  --> excute query <--
const queryExecuter = (sql) => {
  db.query(sql, (err, resulte) => {
    if (err) throw err;
    console.log(resulte);
  });
};
// --> insert data into tables <--
const insertData = (tableName = '', tabelData) => {
  tabelData.forEach((obj) => {
    const toArray = Object.values(obj);
    const toStr = `(${toArray.map((value) => JSON.stringify(value))})`;

    const sql = `INSERT INTO ${tableName} VALUES ${toStr};`;
    queryExecuter(sql);
  });
};
//  --> seed Database <--
const seedDatabase = () => {
  db.connect();
  //   --> create tables <--
  sql.forEach((item) => queryExecuter(item));

  // --> insert data -->
  insertData('author', author);
  insertData('research_papers', research_papbers);
  insertData('researcher', researcher);

  //ex3
  //Write a query that prints names of all authors and their corresponding mentors?
  queryExecuter(
    `SELECT a.author_name, m.author_name AS mentor FROM author a JOIN author m ON m.author_no=a.mentor`,
  );

  //Write a query that prints all columns of authors and their published paper_title. If there is an author without any research_Papers, print the information of that author too.
  queryExecuter(`
SELECT a.author_name, re.paper_title 
 FROM author a 
 LEFT JOIN researcher r 
 ON a.author_no =r.author_no 
  LEFT JOIN research_papers re 
  ON re.paper_id=r.research_id ;`);

  //ex 4

  // 1- All research papers and the number of authors that wrote that paper.
  queryExecuter(`
SELECT COUNT(re.author_no), r.* 
FROM researcher re 
JOIN research_papers r
ON re.research_id =r.paper_id 
GROUP BY r.paper_id ;`);

  //  2-Sum of the research papers published by all female authors.

  queryExecuter(`
SELECT COUNT(*) 
FROM author a
JOIN researcher re on re.author_no = a.author_no And a.gender='f' ;`);

  // 3-Average of the h-index of all authors per university.
  queryExecuter(`
SELECT AVG(h_index),university   
FROM author
GROUP BY university ;`);

  // 4-Sum of the research papers of the authors per university.
  queryExecuter(
    `SELECT COUNT(*) AS total_research , a.university
   FROM researcher re 
   JOIN author a 
   ON a.author_no=re.author_no
   GROUP BY a.university;`,
  );

  // 5-Minimum and maximum of the h-index of all authors per university.
  queryExecuter(`
SELECT university ,MIN(h_index) , MAX(h_index) 
 FROM author 
 GROUP BY university ;
`);
  db.end();
};
seedDatabase();
