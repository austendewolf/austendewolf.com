import { config } from "dotenv";
import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";

config({ path: ".env.local" });

async function main() {
  const url = process.env.DIRECT_URL;
  if (!url) throw new Error("DIRECT_URL not set");

  const client = postgres(url, { max: 1 });
  const db = drizzle(client);

  console.log("Applying migrations...");
  await migrate(db, { migrationsFolder: "../../packages/db/drizzle" });
  console.log("Done.");

  const tables = await client`
    SELECT table_name FROM information_schema.tables
    WHERE table_schema = 'public' ORDER BY table_name
  `;
  console.log("Tables in public schema:", tables.map((t) => t.table_name));

  await client.end();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
