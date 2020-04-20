const argvDB = process.argv[process.argv.length - 1];
const dbPath = argvDB || process.env.dbPath || "src/database/data/db2.json";
const _dbPath = dbPath;
export { _dbPath as dbPath };
