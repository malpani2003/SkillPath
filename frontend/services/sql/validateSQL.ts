import { SQLExecutionConfig, SQLStatement } from "@/types/sql";

export function validateSQL(query: string, config: SQLExecutionConfig): string {
  const statement = query.trim();

  if (!statement) {
    throw new Error("Query cannot be empty.");
  }

  const sqlStatement = getSQLStatement(statement);

  if (!config.allowedStatements.includes(sqlStatement)) {
    throw new Error(
      `${sqlStatement} statements are not allowed for this lesson.`,
    );
  }

  return statement;
}

function getSQLStatement(query: string): SQLStatement {
  const match = query.match(
    /^\s*(SELECT|INSERT|UPDATE|DELETE|CREATE|ALTER|DROP|WITH)\b/i,
  );

  if (!match) {
    throw new Error("Unable to determine the SQL statement type.");
  }

  const statement = match[1].toUpperCase();

  // WITH is a read/query statement for our purposes.
  if (statement === "WITH") {
    return "SELECT";
  }

  return statement as SQLStatement;
}
