import { Connection } from "typeorm";

export type MockConnection<TResult> = Connection & {
  state: {
    sql?: string;
    values?: unknown[]
  }
}

export function makeMockDb<TResult>(results: TResult): MockConnection<TResult> {
  const db = {
    state: {
    }
  } as MockConnection<TResult>;

  async function query(sql: string, values?: unknown[]): Promise<[TResult | undefined, any[]]> {
    await Promise.resolve();
    db.state.sql = sql;
    db.state.values = values;
    return [results, []];
  }

  // @ts-ignore
  db.query = query;
  // @ts-ignore
  db.execute = query;

  return db;
}