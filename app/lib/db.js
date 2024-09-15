import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pokemon',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export async function query(sql, values) {
    const [results] = await pool.execute(sql, values);
    return results;
  }