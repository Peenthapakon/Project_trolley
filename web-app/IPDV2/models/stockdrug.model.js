module.exports = (sequelize, Sequelize) => {
    const stockdrug = sequelize.define("stockdrug", {
   
      packId: {
        type: Sequelize.STRING(5),
        unique: true 
      },
      name: {
        type: Sequelize.STRING(100)
      },
      meal: {
        type: Sequelize.STRING(2)
      },
      typeMeal: {
        type: Sequelize.STRING(5)
      },
      time: {
        type: Sequelize.STRING(1)
      },
      unit: {
        type: Sequelize.INTEGER
      },
      status: {
        type: Sequelize.STRING,
        defaultValue: 0
      },
      hn: {
        type: Sequelize.STRING(8)
      },
      codebox: {
        type: Sequelize.STRING
      },
      remarkdrug: {
        type: Sequelize.STRING
      },
      doctor: {
        type: Sequelize.STRING
      },
      remark: {
        type: Sequelize.STRING
      },
     
    },
    
      {
        tableName: 'stockdrug',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  
    return stockdrug;
  };