const argvDB = process.argv[process.argv.length - 1];
const dbPath = process.env.dbPath || argvDB;
const _dbPath = dbPath;
export { _dbPath as dbPath };
