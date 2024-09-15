const db = require('../config/db');

const cryptos = {

    // Inserting into database
    create: (crypto,callback) => {
      const {name, last, buy, sell, volume, base_unit} = crypto;
      const sql = 'INSERT INTO tickers (name, last, buy, sell, volume, base_unit) VALUES (?,?,?,?,?,?)';
      db.query(sql, [name, last, buy, sell, volume, base_unit ] , (err,result)=>{
         if(err) {
            console.log('Error inserting data:',err);
            callback(err,null);
         } 
      });
    },

    // To retrieve the data
    find: (callback)=>{
      const sql = 'SELECT * FROM tickers';
      db.query(sql, (err,result)=>{
         if(err){
            console.log('Error fetching the data',err);
            callback(err,null);
         }
         callback(null,result);
      });
    }
};

module.exports = cryptos;