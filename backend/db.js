const { MongoClient, Decimal128 } = require("mongodb");
const uri =
  "mongodb+srv://mongo:mongo@cluster0.3pprbwh.mongodb.net/shop?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useUnifiedTopology: true });

let _db;

const initDb = async (callback) => {
  if (_db) {
    console.log("db is already initalized");
    return callback(null, _db);
  }
  await client
    .connect()
    .then((clnt) => {
      _db = clnt;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error("Database not initialized");
  }
  return _db;
};
module.exports = {
    initDb,
    getDb
}