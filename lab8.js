/**
Name:
Date:
Description:
Bugs: Write none known if you don't know of any
Reflection: Describe the steps you took to write this, and the problems you encountered along the way. 
            Include any LLM usage (but be sure and review the syllabus section specifying where LLMs can and cannot be used)
*/

import dotenv from 'dotenv';
import pg from 'pg';

// Resolve .env beside this file, even when launched from another directory.
dotenv.config({ path: new URL('.env', import.meta.url), quiet: true });

if (!process.env.DATABASE_URL) {
  throw new Error('Set DATABASE_URL in .env before running this demo.');
}

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  connectionTimeoutMillis: 10000,
});

async function demoSelect() {

  try {
    const { rows } = await client.query(
      'SELECT * FROM movies',
    );

    for(let row of rows){
      console.log(rows);
    }

  } catch (error) {
    console.error('Supabase demo failed:', error.message);
    process.exitCode = 1;
  }
}

await client.connect();
await demoSelect();
await client.end();