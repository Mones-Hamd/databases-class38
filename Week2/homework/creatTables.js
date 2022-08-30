const dropdDatabase = `DROP Database IF EXISTS homework`;
const createDatabase = `CREATE Database IF NOT EXISTS  homework`;
const useDatabase = `USE homework`;
const creatAuthorTable = ` 
CREATE TABLE IF NOT EXISTS author(
  author_no INT PRIMARY KEY ,
  author_name VARCHAR(55),
  university VARCHAR(55),
  date_of_birth DATE,
  h_index INT ,
  gender ENUM('m','f')
)`;
const addMenetorColumn = `
ALTER TABLE author
ADD  mentor INT ,

ADD  FOREIGN KEY (mentor) REFERENCES author(author_no);`;

//   -->exe 2 create research_papers table <--

const createResearchTable = `
CREATE TABLE research_papers(
  paper_id int PRIMARY KEY ,
  paper_title text ,
  conference varchar(100) ,
  publish_date date 
)
`;
const createResearcherTable = `

CREATE TABLE researcher(
author_no INT ,
research_id INT,
FOREIGN KEY (author_no) REFERENCES author(author_no),
FOREIGN KEY (research_id) REFERENCES research_papers(paper_id),
PRIMARY KEY (author_no,research_id)
);


`;
export const sql = [
  dropdDatabase,
  createDatabase,
  useDatabase,
  creatAuthorTable,
  addMenetorColumn,
  createResearchTable,
  createResearcherTable,
];
