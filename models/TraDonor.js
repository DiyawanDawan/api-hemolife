module.exports = (sequelize, DataTypes) => {
	const TraDonor = sequelize.define(
		"TraDonor",
		{
			id_tra_donor: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				allowNull: false,
			},
			id_user: {
				type: DataTypes.STRING,
			},
			id_gol_darah: {
				type: DataTypes.STRING,
			},
			id_lokasi_pmi: {
				type: DataTypes.STRING,
			},
			id_jadwal: {
				type: DataTypes.STRING,
			},
			tanggal_daftar: {
				type: DataTypes.DATE,
				defaultValue: DataTypes.NOW,
				allowNull: false,
			},
			status: {
				type: DataTypes.TINYINT,
				allowNull: false,
			},
		},
		{ tableName: "tra_donor", timestamps: false }
	);

	TraDonor.associate = function (models) {
		TraDonor.belongsTo(models.User, { foreignKey: "id_user" });
		TraDonor.belongsTo(models.Jadwal, {foreignKey: "id_jadwal"})
		TraDonor.belongsTo(models.GolDarah, { foreignKey: "id_gol_darah" });
		TraDonor.belongsTo(models.LokasiPmi, { foreignKey: "id_lokasi_pmi" });
	};

	return TraDonor;
};
