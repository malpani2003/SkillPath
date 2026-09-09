import { getDatabase } from "./database";

export async function executeSQL(query: string) {
  const db = await getDatabase();
  const statement = query.trim();

  if (!statement) {
    throw new Error("Query cannot be empty.");
  }
  const result = await db.getAllAsync<Record<string, unknown>>(statement);
  const columns = result.length > 0 ? Object.keys(result[0]) : [];
  const rows = result.map((row) => columns.map((column) => row[column]));
  return {
    columns,
    rows,
  };
}
