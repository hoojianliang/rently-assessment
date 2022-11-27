import sqlite3 from 'sqlite3'
import apartmentsmodel from '../models/apartments.js'

export default defineEventHandler(async (event) => {
  let db = new sqlite3.Database('./rently-assessment.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the rently-assessment SQlite database.');
  });

  const apartmentsdb = new apartmentsmodel(db);
  const apartments = await apartmentsdb.findApartments();

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  
  return apartments;
})
