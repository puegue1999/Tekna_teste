const jwt = require("jsonwebtoken");
const CONFIG = require("../config/config");

module.exports = (sequelize, DataTypes) => {
  var Model = sequelize.define(
    "users",
    {
      name: { type: DataTypes.STRING, required: true,  },
      email: { type: DataTypes.STRING, required: true, unique: true },
      password: { type: DataTypes.STRING, required: true },
      localTimestampCreated: { type: DataTypes.STRING, field: "local_timestamp_created" },

      status: { type: DataTypes.STRING, field: "STATUS" },
    },
    { tableName: "users", timestamps: false }
  );

  Model.prototype.getJWT = function () {
    let expiration_time = parseInt(CONFIG.jwt_expiration);
    return (
      "Bearer " +
      jwt.sign({ id: this.id, email: this.userEmail }, CONFIG.jwt_encryption, {
        expiresIn: expiration_time,
      })
    );
  };

  return Model;
};