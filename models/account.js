const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
    const Account = sequelize.define('Account', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: '사용자 계정 고유 ID',
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: false,
            comment: '사용자 이름',
        },
        password: {
            type: DataTypes.STRING(60),
            allowNull: false,
            comment: '사용자 패스워드',
        }
    },  {
        freezeTableName: true,
        instanceMethods: {
            generateHash(password) {
                return bcrypt.hash(password, bcrypt.genSaltSync(8));
            },
            validPassword(password) {
                return bcrypt.compare(password, this.password);
            }
        }
    });

    return Account;

};