require('dotenv').config()

const { exec } = require('child_process');

const dumpCommand = `pg_dump -Fc -v -d postgres://${process.env.NEON_USER}:${process.env.NEON_PASSWORD}@${process.env.NEON_HOST}/${process.env.DATABASE}`;
const restoreCommand = `pg_restore -v -d postgresql://${process.env.PG_USER}:${process.env.PASSWORD}@${process.env.HOST}/${process.env.DATABASE}`;

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