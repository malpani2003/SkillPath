export type SQLColumn = {
  name: string;
  type: string;
};

export type SQLTable = {
  name: string;
  columns: SQLColumn[];
};

export type SQLSchema = {
  tables: SQLTable[];
};

export type SQLQueryResult = {
  columns: string[];
  rows: unknown[][];
};

export type SQLStatement =
  | "SELECT"
  | "INSERT"
  | "UPDATE"
  | "DELETE"
  | "CREATE"
  | "ALTER"
  | "DROP";

export type SQLExecutionConfig = {
  allowedStatements: SQLStatement[];
};

export type SQLExercise = {
  id: string;
  title: string;
  description: string;
  schema: SQLSchema;
  initialQuery?: string;
  expectedResult?: SQLQueryResult;
};
