import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

// Open the database connection and apply migrations
const dbPromise = sqlite.open({
  filename: './data_plan.db',
  driver: sqlite3.Database
});

export async function getpricePlans() {
  const db = await dbPromise;
  const pricePlans = await db.all('SELECT * FROM price_plan'); // Get all price plans
  return pricePlans;
}

export async function addPricePlans(plan_name, sms_price, call_price) {
  const db = await dbPromise;
  const sql = 'INSERT INTO price_plan (plan_name, sms_price, call_price) VALUES (?, ?, ?)';
  await db.run(sql, [plan_name, sms_price, call_price]);
}

export async function updatePricePlans(plan_name, sms_price, call_price, id) {
  const db = await dbPromise;
  const sql = 'UPDATE price_plan SET plan_name = ?, sms_price = ?, call_price = ? WHERE id = ?';
  await db.run(sql, [plan_name, sms_price, call_price, id]);
}

export async function deletePricePlans(id) {
  const db = await dbPromise;
  const sql = 'DELETE FROM price_plan WHERE id = ?';
  await db.run(sql, [id]);
}


