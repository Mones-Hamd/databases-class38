import mysql2 from 'mysql2';
import meetupData from './database.js';

const schema = {
  host: '127.0.0.1',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'meetup',
};
const db = mysql2.createConnection(schema);
db.connect();

//pass a query
const passQuery = (sql) => {
  db.query(sql, (err, result) => {
    if (err) throw err;
    console.log(result);
  });
};
// insert data

const insertData = (tableName, tabelData) => {
  tabelData.forEach((obj) => {
    const toArray = Object.values(obj);
    const toStr = `(${toArray.map((value) => JSON.stringify(value))})`;

    const sql = `INSERT INTO ${tableName} VALUES ${toStr};`;
    passQuery(sql);
  });
};
//drop database if its exists
const dropDatabase = 'DROP DATABASE IF EXISTS meetup ; ';
passQuery(dropDatabase);
//create databse if not exists
const createDatabase = `CREATE DATABASE IF NOT EXISTS meetup ;`;
passQuery(createDatabase);

passQuery('USE meetup;');
//create invitee table
const createInviteeTable = `
CREATE TABLE IF NOT EXISTS invitee(
  invitee_no INT ,
  invitee_name VARCHAR(255),
  invitee_by VARCHAR(255),
  PRIMARY KEY(invitee_no))`;
passQuery(createInviteeTable);
//create room table
const createRoomTable = `CREATE TABLE IF NOT EXISTS room(
  room_no INT ,
  room_name VARCHAR(255),
  floor_number INT,
  PRIMARY KEY(room_no));`;
passQuery(createRoomTable);
//create meeting table
const createMeetinTable = `CREATE TABLE IF NOT EXISTS meeting(
  meeting_no INT ,
  meeting_title VARCHAR(255) ,
  starting_time DATETIME ,
  ending_time DATETIME ,
  room_no INT ,
  PRIMARY KEY(meeting_no),
  FOREIGN KEY (room_no) REFERENCES room(room_no));`;
passQuery(createMeetinTable);

// Insert 5 rows into each table with relevant fields

//   --> invitee table <--
insertData('invitee', meetupData.invitee);
//   --> room table <--
insertData('room', meetupData.room);
//    --> meeting table <--
insertData('meeting', meetupData.meeting);

db.end();
///-------------///
