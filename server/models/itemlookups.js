function itemlookups(db) {
  this.db = db;
}
itemlookups.prototype.findItems = async function () {
  var me = this;
  return new Promise(function (resolve, reject) {
    me.db.all("select * from ItemLookUp", [], function (err, rows) {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
};

module.exports = itemlookups;
