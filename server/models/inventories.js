function inventories(db) {
  this.db = db;
}
inventories.prototype.findInventories = async function (val) {
  var me = this;
  return new Promise(function (resolve, reject) {
    me.db.all(
      "select * from Inventory where ApartmentID = " + val,
      [],
      function (err, rows) {
        if (err) {
          return reject(err);
        }
        const count = rows.reduce((total, row) => {
          return total + row.Amount;
        }, 0);
        resolve({ data: rows, count });
      }
    );
  });
};
inventories.prototype.updateInventories = async function (val, body) {
  var me = this;
  return new Promise(function (resolve, reject) {
    let sql = `UPDATE Inventory
            SET Amount = ?
            WHERE ID = ?`;

    body.forEach(function (item) {
      me.db.run(sql, [item.Amount, item.ID], function (err) {
        if (err) {
          console.log(err.message);
          reject(err.message);
        }
      });
    });

    resolve({ status: true });
  });
};

module.exports = inventories;
