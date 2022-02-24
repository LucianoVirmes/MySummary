module.exports = (sequelize, DataTypes) => {
    const Link = sequelize.define('Link', {
      id: {
          primaryKey: true,
          type: DataTypes.BIGINT,
          autoIncrement: true
      },
      title: {
          type: DataTypes.STRING, 
          allowNull: false
        },
      url: {
          type: DataTypes.STRING, 
          allowNull: false
        },
    }, {timestamps: false});
  
    return Link;
  }