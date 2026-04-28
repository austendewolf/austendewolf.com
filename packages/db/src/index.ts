import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

export * from "./schema";
export { schema };

export function createDb(connectionString: string) {
  const client = postgres(connectionString, { prepare: false });
  return drizzle(client, { schema });
}

const url = process.env.DATABASE_URL;
const client = url ? postgres(url, { prepare: false }) : null;
export const db = client ? drizzle(client, { schema }) : (null as never);
