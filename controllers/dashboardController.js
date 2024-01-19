const moment = require('moment');
const {
  GolDarah,
  LokasiPmi,
  TraDonor,
  TraReqDarah,
  User,
  sequelize,
} = require("../models");

exports.getDashboardUser = async (req, res) => {
    try {
        const userId = req.user.userId;
        const user = await User.findByPk(userId);
        // Retrieve blood donation requests made by the user
        const userRequesterData = await TraReqDarah.findAll({
            where: { id_user_volunteer: userId, status: 1 }, // Ensure status corresponds to unconfirmed requests
            include: [
                { model: GolDarah, attributes: ["id_gol_darah", "gol_darah"] },
                { model: User, attributes: ["id_user", "nama", "email"] },
            ],
        });

        const userAcceptData = await TraReqDarah.findAll({
            where: { id_user_volunteer: userId, status: 2 },
            include: [
                { model: GolDarah, attributes: ["id_gol_darah", "gol_darah"] },
                { model: User, attributes: ["id_user", "nama", "email", "alamat", "no_hp"] },
            ],
        });

        const userRejectData = await TraReqDarah.findAll({
            where: { id_user_volunteer: userId, status: 0 },
            include: [
                { model: GolDarah, attributes: ["id_gol_darah", "gol_darah"] },
                { model: User, attributes: ["id_user", "nama", "email", "alamat", "no_hp"] },
            ],
        });

        const response = {
            success: true,
            message: "success",
            welcome: `Selamat datang, ${user.nama}!`,
            sukarelawan_menerima: userAcceptData.map((data) => ({
                id_user_volunteer: data.id_user_volunteer,
                nama_volunteer: data.User.nama,
                email_volunteer: data.User.email,
                status: "Diterima",
                alamat_volunteer: data.User.alamat,
                gol_darah: data.GolDarah.gol_darah,
                no_hp: data.User.no_hp,
            })),
            sukarelawan_menolak: userRejectData.map((data) => ({
                id_user_volunteer: data.id_user_volunteer,
                nama_volunteer: data.User.nama,
                email_volunteer: data.User.email,
                status: "Ditolak",
                alamat_volunteer: data.User.alamat,
                gol_darah: data.GolDarah.gol_darah,
                no_hp: data.User.no_hp,
            })),
            pemohon: userRequesterData.map((data) => ({
                id_user: data.id_user_req,
                nama_pemohon: data.User.nama,
                email_pemohon: data.User.email,
                gol_darah: data.GolDarah.gol_darah,
                alamat_pemohon: data.User.alamat,
            })),
        };

        res.json(response);
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

// Controller function to accept a request (changed method to POST)
exports.postAcceptRequest = async (req, res) => {
  try {
    const { id_tra_req_darah } = req.body;

    // Update the status to 2 (accepted)
    const updatedRecord = await TraReqDarah.update(
      { status: 2 },
      { where: { id_tra_req_darah } }
    );

    if (updatedRecord[0] === 0) {
      // No records were updated (id_tra_req_darah not found)
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Request accepted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Controller function to reject a request (changed method to POST)
exports.postRejectRequest = async (req, res) => {
  try {
    const { id_tra_req_darah } = req.body;

    // Update the status to 0 (rejected)
    const updatedRecord = await TraReqDarah.update(
      { status: 0 },
      { where: { id_tra_req_darah } }
    );

    if (updatedRecord[0] === 0) {
      // No records were updated (id_tra_req_darah not found)
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({ message: "Request rejected successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};




