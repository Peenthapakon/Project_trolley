module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("User", {

      username: {
        type: Sequelize.STRING(10),
        unique: true 
      },
     password: {
        type: Sequelize.STRING(10)
        },
        type: {
            type: Sequelize.STRING
         },
      
     },
      {
        tableName: 'User',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  
    return User;
  };
  
