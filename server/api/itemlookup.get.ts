import sqlite3 from 'sqlite3'
import itemlookupsmodel from '../models/itemlookups.js'

export default defineEventHandler(async (event) => {
  let db = new sqlite3.Database('./rently-assessment.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the rently-assessment SQlite database.');
  });

  const itemlookupsdb = new itemlookupsmodel(db);
  const itemlookups = await itemlookupsdb.findItems();

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  
  return itemlookups;
})
