module.exports = (sequelize, Sequelize) => {
    const Drug = sequelize.define("drug", {
      packId: {
        type: Sequelize.STRING(5)
      },
      packName: {
        type: Sequelize.STRING(100)
      },
      packUnit: {
        type: Sequelize.STRING
      },
      packMeal: {
        type: Sequelize.STRING(2)
      },
      typeMeal: {
        type: Sequelize.STRING(5)
      },
      time: {
        type: Sequelize.STRING(1)
      },
      hnId: {
        type: Sequelize.STRING(8)
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 0
      },
      
    },
    
      {
        tableName: 'drug',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  
    return Drug;
  };