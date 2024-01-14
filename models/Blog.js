
const { nanoid } = require("nanoid");

module.exports = (sequelize, DataTypes) => {
    const Blogs = sequelize.define(
        'Blogs',
        {
            id_blog: {
                type: DataTypes.STRING,
                defaultValue: () => nanoid(14),
                primaryKey: true,
                allowNull: false,
            },
            judul: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            konten: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            penulis: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            tanggal_publikasi: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
        },
        {
            tableName: 'blogs',
            timestamps: true,
        }
    );

    return Blogs;
};
