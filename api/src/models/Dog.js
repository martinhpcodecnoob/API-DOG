const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('dog', {
    id:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height:{
      type:DataTypes.STRING,
      allowNull: false
    },
    weight:{
      type:DataTypes.STRING,
    },
    yearlife:{
      type:DataTypes.STRING,
      allowNull:false
    },
    origin: {
      // type:DataTypes.ARRAY(DataTypes.STRING)
      type:DataTypes.STRING
    },
    image:{
      type: DataTypes.STRING,
      defaultValue:'https://cdn.pixabay.com/photo/2017/03/25/14/26/animals-2173635_960_720.jpg'
    }
  },{
    timestamps:false
  });
};
