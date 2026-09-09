import { getDatabase, resetUsersDatabase } from "./database";
import { validateSQL } from "./validateSQL";
import { SQLExecutionConfig, SQLQueryResult } from "@/types/sql";

export async function runSQL(
  query: string,
  config: SQLExecutionConfig,
): Promise<SQLQueryResult> {
  const statement = validateSQL(query, config);

  const db = await getDatabase();

  await resetUsersDatabase();

  const result = await db.getAllAsync<Record<string, unknown>>(statement);

  const columns = result.length > 0 ? Object.keys(result[0]) : [];

  const rows = result.map((row) => columns.map((column) => row[column]));

  return {
    columns,
    rows,
  };
}
