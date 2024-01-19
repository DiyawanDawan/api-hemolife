const moment = require('moment');
const { Op, Sequelize } = require("sequelize");
const { GolDarah, User, TraReqDarah } = require("../models");

exports.listVolunteer = async (req, res) => {
  try {
    // Retrieve all active volunteers with their blood types
    const volunteersList = await User.findAll({
      where: {
        sts_volunteer: 1,
      },
      include: [
        {
          model: GolDarah,
          attributes: ["gol_darah"],
        },
      ],
    });

    // Format the response without including passwords
    const volunteers = volunteersList.map((volunteer) => ({
      id_user: volunteer.id_user,
      id_gol_darah: volunteer.id_gol_darah,
      nama: volunteer.nama,
      email: volunteer.email,
      no_hp: volunteer.no_hp,
      jenis_kelamin: volunteer.jenis_kelamin,
      tanggal_lahir: volunteer.tanggal_lahir,
      alamat: volunteer.alamat,
      sts_volunteer: volunteer.sts_volunteer,
      gol_darah: volunteer.GolDarah.gol_darah,
    }));

    res.json({ error: false, message: "Success", volunteers });
  } catch (error) {
    console.error("Error in listVolunteer:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};
exports.searchVolunteer = async (req, res) => {
  try {
    const { q } = req.query;
    console.log("Query Parameter:", q);

    // Dapatkan ID user dari req.user
    const userId = req.user.userId;

    // Pisahkan kata-kata dalam query parameter
    const keywords = q.toLowerCase();

    const likeClauses = {
      [Op.or]: [
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('User.alamat')), 'LIKE', `%${keywords}%`),
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('User.nama')), 'LIKE', `%${keywords}%`),
        Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('GolDarah.gol_darah')), 'LIKE', `%${keywords}%`),
      ],
    };

    console.log("Keywords:", keywords);
    console.log("Like Clauses:", likeClauses);

    // Cari volunteer dengan kriteria
    const volunteersList = await User.findAll({
      raw: true,
      where: {
        id_user: {
          [Op.ne]: userId,
        },
        sts_volunteer: 1,
        [Op.or]: likeClauses[Op.or], // Gunakan Op.or di sini secara langsung
      },
      include: [
        {
          model: GolDarah,
          attributes: ["gol_darah"],
        },
      ],
      // Tambahkan ini untuk menampilkan query yang dihasilkan
      logging: console.log,
    });

    // Membuat format hasil sesuai dengan keinginan
    const formattedVolunteers = volunteersList.map((volunteer) => ({
      id_user: volunteer.id_user,
      id_gol_darah: volunteer.id_gol_darah,
      nama: volunteer.nama,
      email: volunteer.email,
      no_hp: volunteer.no_hp,
      jenis_kelamin: volunteer.jenis_kelamin,
      tanggal_lahir: volunteer.tanggal_lahir,
      alamat: volunteer.alamat,
      sts_volunteer: volunteer.sts_volunteer,
      gol_darah: volunteer["GolDarah.gol_darah"],
    }));

    res.json({
      error: false,
      message: "success",
      volunteers: formattedVolunteers,
    });
  } catch (error) {
    console.error("Error in searchVolunteer:", error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};

exports.requestVolunteer = async (req, res) => {
  try {
    const { id_user, gol_darah } = req.body;

    // Dapatkan ID user dari req.user
    const id_user_req = req.user.userId;

    // Cek apakah user yang diminta volunteer sudah ada dan sts_volunteer = 1
    const requestedUser = await User.findOne({
      where: {
        id_user,
        sts_volunteer: 1,
        id_gol_darah: gol_darah,
      },
      include: [GolDarah],
    });

    if (!requestedUser) {
      return res.status(400).json({ error: true, message: "User volunteer tidak ditemukan" });
    }

    // Hitung tanggal expired
    const tgl_req_darah = new Date();
    const tgl_expired = new Date(tgl_req_darah);
    tgl_expired.setDate(tgl_expired.getDate() + 3);

    // Buat permintaan darah
    const newRequest = await TraReqDarah.create({
      id_user_req,
      id_user_volunteer: id_user,
      id_gol_darah: gol_darah,
      tgl_req_darah,
      tgl_expired,
      status: 1,
    });

    // Ambil detail data peminta dan volunteer dari database
    const pemintaDetail = await User.findByPk(id_user_req, { include: GolDarah });
    const volunteerDetail = requestedUser; // Menggunakan data yang sudah diambil di atas

    // Format tanggal menggunakan Moment.js
    const formattedTglReqDarah = moment(tgl_req_darah).locale('id-ID').format('dddd, DD MMMM YYYY HH:mm:ss');
    const formattedTglExpired = moment(tgl_expired).locale('id-ID').format('dddd, DD MMMM YYYY HH:mm:ss');

    res.json({
      error: false,
      message: "Permintaan darah berhasil dibuat",
      request: {
        ...newRequest.toJSON(),
        tgl_req_darah: formattedTglReqDarah,
        tgl_expired: formattedTglExpired,
        peminta: {
          id_user: pemintaDetail.id_user,
          nama: pemintaDetail.nama,
          alamat: pemintaDetail.alamat,
          gol_darah: pemintaDetail.GolDarah.gol_darah,
          // tambahkan informasi lain yang diinginkan
        },
        volunteer: {
          id_user: volunteerDetail.id_user,
          nama: volunteerDetail.nama,
          alamat: volunteerDetail.alamat,
          gol_darah: volunteerDetail.GolDarah.gol_darah,
          // tambahkan informasi lain yang diinginkan
        },
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: true, message: "Internal Server Error" });
  }
};
