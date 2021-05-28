module.exports = (sequelize, Sequelize) => {
    const instructor = sequelize.define("instructor", {
        username: {
            type: Sequelize.STRING(10),
            unique: true 
          },
        fname: {
        type: Sequelize.STRING(20),
       
      },
      lname: {
        type: Sequelize.STRING(20),
       
      },
      position: {
        type: Sequelize.STRING(20),
       
      },
    
        type: {
            type: Sequelize.STRING
            },
        
     },
    
      {
        tableName: 'instructor',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  
    return instructor;
  };