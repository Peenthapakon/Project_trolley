module.exports = (sequelize, Sequelize) => {
    const Tutorial = sequelize.define("patients", {
      ward: {
        type: Sequelize.STRING(30)
      },
      hnId: {
        type: Sequelize.STRING(8)
      },
      fullname: {
        type: Sequelize.STRING(100)
      },
      bed: {
        type: Sequelize.STRING(4)
      },
      codebox: {
        type: Sequelize.STRING(2)
      },
    
    },
    
      {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        
      }
    );
  
    return Tutorial;
  };