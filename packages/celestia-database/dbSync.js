require('dotenv').config()

const { exec } = require('child_process');

const dumpCommand = `pg_dump -Fc -v -d postgres://${process.env.NEON_USER}:${process.env.NEON_PASSWORD}@${process.env.NEON_HOST}/celestia`;
const restoreCommand = `pg_restore -v -d postgresql://postgres:password@127.0.0.1/celestia`;

exec(`${dumpCommand} | ${restoreCommand}`, (error, stdout, stderr) => {
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