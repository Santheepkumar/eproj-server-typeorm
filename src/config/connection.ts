import { getConnectionOptions, createConnection } from "typeorm";
import { getConnection } from "typeorm";

const createConn = async () => {
  const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
  return createConnection({ ...connectionOptions, name: "default" });
};

const connection = {
  async create() {
    await createConn();
  },

  async close() {
    await getConnection().close();
  },

  async clear() {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    entities.forEach(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM \"${entity.tableName}\";`);
      // await repository.query(`TRUNCATE TABLE \"${entity.tableName}\";`);
      
      // await repository.clear();
    });
  },
};
export default connection;
