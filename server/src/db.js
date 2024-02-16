const { res } = require("express");
const { Pool } = require("pg");

const appPool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: "5432",
  database: "income_tracker",
});

const masterPool = new Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: "5432",
  database: "postgres",
});

async function createDatabase() {
  try {
    // drop database for every setup
    await masterPool.query("DROP DATABASE IF EXISTS income_tracker;");

    // and make new database
    const result = await masterPool.query("CREATE DATABASE income_tracker;");
    console.log("Database 'income_tracker' created successfully");
  } catch (error) {
    console.error("Failed to create database 'income_tracker'");
    console.error(error);
  }
}

async function createTableIncomes() {
  const CREATE_INCOMES_TABLE = `
    CREATE TYPE tipe_enum AS ENUM ('in', 'out');

    CREATE TABLE incomes (
        id SERIAL PRIMARY KEY,
        nominal FLOAT NOT NULL,
        tujuan VARCHAR(255) NOT NULL,
        tanggal DATE NOT NULL,
        tipe tipe_enum NOT NULL
    );`;
  try {
    const result = await appPool.query(CREATE_INCOMES_TABLE);
    console.log("Table 'incomes' created successfully");
  } catch (error) {
    console.error("Failed to create table 'incomes'");
    console.error(error);
  }
}

async function createDummyIncomes() {
  const INSERT_MOC_INCOMES = `
    INSERT INTO incomes (nominal, tujuan, tanggal, tipe) 
    VALUES 
        (1000, 'Gaji', '2024-02-16', 'in'),
        (500, 'Bonus', '2024-02-16', 'in'),
        (200, 'Hadiah', '2024-02-17', 'in'),
        (300, 'Lainnya', '2024-02-17', 'in'),
        (700, 'Gaji', '2024-02-18', 'in'),
        (200, 'makan', '2024-02-18', 'out'),
        (100, 'minum', '2024-02-18', 'out'),
        (600, 'ojek', '2024-02-18', 'out')
    `;

  try {
    const result = await appPool.query(INSERT_MOC_INCOMES);
    console.log("Table 'incomes' inserted successfully");
  } catch (error) {
    console.error("Failed to insert data to table 'incomes'");
    console.error(error);
  }
}

async function setupDatabase() {
  await createDatabase();
  await createTableIncomes();
  await createDummyIncomes();
}

setupDatabase()
  .then(() => {
    console.log("Database setup complete");
  })
  .catch((error) => {
    console.error("Database setup failed");
    console.error(error);
  });

module.exports = appPool;
