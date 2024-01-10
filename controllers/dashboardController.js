const {
  GolDarah,
  LokasiPmi,
  TraDonor,
  TraReqDarah,
  User,
  sequelize,
  Sequelize,
} = require("../models");

exports.getDashboardUser = async (req, res) => {
  try {
    const userId = req.user.userId;

    const traDonorList = await TraDonor.findAll({
      where: { id_user: userId },
      include: [
        { model: GolDarah, attributes: ["id_gol_darah", "gol_darah"] },
        { model: LokasiPmi, attributes: ["id_lokasi_pmi", "nama"] },
      ],
    });

    const userRequesterData = await TraReqDarah.findAll({
      where: { id_user_req: userId, status: 2 },
      include: [
        { model: GolDarah, attributes: ["id_gol_darah", "gol_darah"] },
      ],
    });

    const userRejectData = await TraReqDarah.findAll({
      where: { id_user_req: userId, status: 0 },
      include: [
        { model: GolDarah, attributes: ["id_gol_darah", "gol_darah"] },
      ],
    });

    const pendonor = traDonorList.map((traDonor) => ({
      id_donor: traDonor.id_tra_donor,
      gol_darah: traDonor.GolDarah.gol_darah,
      lokasi_pmi: traDonor.LokasiPmi ? traDonor.LokasiPmi.nama : null,
      tanggal_donor:
        traDonor.tgl_donor >= new Date(new Date().setHours(0o0, 0o0, 0o0)) &&
        traDonor.tgl_donor < new Date(new Date().setHours(23, 59, 59))
          ? traDonor.tgl_donor.toISOString().split("T")[0]
          : null,
    }));

    const response = {
      success: true,
      sukarelawan_menerima: userRequesterData.map((data) => ({
        id_user_volunteer: data.id_user_volunteer,
        nama_volunteer: data.nama,
        status: "Diterima",
        alamat_volunteer: data.alamat,
        gol_darah: data.GolDarah.gol_darah,
        no_hp: data.no_hp,
      })),
      sukarelawan_menolak: userRejectData.map((data) => ({
        id_user_volunteer: data.id_user_volunteer,
        nama_volunteer: data.nama,
        status: "Ditolak",
        alamat_volunteer: data.alamat,
        gol_darah: data.GolDarah.gol_darah,
        no_hp: data.no_hp,
      })),
      pemohon: userRequesterData.map((data) => ({
        id_user: data.id_user_req,
        nama_pemohon: data.nama,
        gol_darah: data.GolDarah.gol_darah,
        alamat: data.alamat,
      })),
      pendonor: pendonor,
    };

    res.json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};


// Controller function to accept a request
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




