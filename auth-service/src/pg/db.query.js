import { InternalServerError } from '../core/error.response.js';
import pool from '../dbs/init.postgreSQL.js';

export const query = async (command) => {
  return new Promise((resolve, reject) => {
    pool.query(command, (err, res) => {
      if (err) {
        console.log(err.message);
        reject(new InternalServerError(err.message));
      } else {
        resolve(res.rows);
      }
    });
  });
};
