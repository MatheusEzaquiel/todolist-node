import pgPromise from "pg-promise";

const pgp = require("pg-promise")();
const join = require("node:path");

const USERNAME = "postgres";
const PASSWORD = "mberoot";
const HOST = "localhost";
const PORT = "5432";
const DATABASE = "task_db";

const db: any = pgp(`postgres://${USERNAME}:${PASSWORD}@${HOST}:${PORT}/${DATABASE}`);

module.exports = db;