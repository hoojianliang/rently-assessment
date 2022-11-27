import sqlite3 from 'sqlite3'
import inventoriesmodel from '../../models/inventories.js'

export default defineEventHandler(async (event) => {
  let db = new sqlite3.Database('./rently-assessment.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the rently-assessment SQlite database.');
  });

  const inventoriesdb = new inventoriesmodel(db);
  const inventories = await inventoriesdb.findInventories(event.context.params.apartment);

  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  
  return inventories;
})
