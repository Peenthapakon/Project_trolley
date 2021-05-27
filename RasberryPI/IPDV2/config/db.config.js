module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "test",
    dialect: "mysql",
    charset : 'utf8',
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };
