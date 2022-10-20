export default () => ({
  database: {
    mongo_db_uri: process.env.MONGO_DB_URI,
    mongo_db_test_uri: process.env.MONGO_DB_TEST_URI,
  },
});
