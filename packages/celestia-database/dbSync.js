require('dotenv').config()

const { exec } = require('child_process');

const dumpFilePath = 'db_dumps/celestia_dump.sql';
const restoreCommand = `pg_restore -v -d postgresql://postgres:password@127.0.0.1/celestia ${dumpFilePath}`;

exec(`${restoreCommand}`, (error, stdout, stderr) => {
  if (error) {
    console.log(`error: ${error.message}`);
    return;
  }
  if (stderr) {
    console.log(`stderr: ${stderr}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
});