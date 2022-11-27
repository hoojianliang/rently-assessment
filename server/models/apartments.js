function apartments(db) {
  this.db = db;
}
apartments.prototype.findApartments = async function () {
  var me = this;
  return new Promise(function (resolve, reject) {
    me.db.all("select * from Apartment", [], function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

module.exports = apartments;
