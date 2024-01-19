// jadwalController.js
const moment = require('moment');
const {
  Jadwal,
  BankDarah,
  GolDarah,
  LokasiPmi,
  TraDonor,
  User,
  sequelize,
  Sequelize,
} = require("../models");

// Controller function to get all jadwal data
exports.getAllJadwalPerDay = async (req, res) => {
  try {
    // Fetch jadwal records for the specified day from the database
    const jadwalData = await Jadwal.findAll({
      include: [
        {
          model: LokasiPmi,
          attributes: [
            "id_lokasi_pmi",
            "nama",
            "alamat",
            "latitude",
            "longitude",
          ],
        },
      ],
    });

    // Format the response
    const formattedData = jadwalData.map((jadwal) => ({
      id_lok_pmi: jadwal.LokasiPmi.id_lokasi_pmi,
      nama_lok_pmi: jadwal.LokasiPmi.nama,
      alamat_pmi: jadwal.LokasiPmi.alamat,
      tanggal_donor: moment(jadwal.tanggal_donor).locale('id-ID').format('dddd, DD MMMM YYYY'),
      jadwal_jam_mulai: jadwal.jadwal_jam_mulai,
      jadwal_jam_selesai: jadwal.jadwal_jam_selesai,
      latitude: jadwal.LokasiPmi.latitude,
      longitude: jadwal.LokasiPmi.longitude,
    }));

    // Send the formatted jadwal data as a response
    res.json({ success: true, message: "success", results: formattedData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};

exports.getDetailLocationById = async (req, res) => {
    try {
        const lokasiPmiData = await LokasiPmi.findOne({
            attributes: [
                "id_lokasi_pmi",
                "nama",
                "no_telpon",
                "alamat",
                "latitude",
                "longitude",
            ],
            where: {
                id_lokasi_pmi: req.params.id,
            },
            include: [
                {
                    model: Jadwal,
                    attributes: ["id_jadwal", "jadwal_jam_mulai", "jadwal_jam_selesai", "tanggal_donor"],
                },
            ],
            nest: true, // Add this option to nest the associations
        });

        if (!lokasiPmiData) {
            return res.status(404).json({ success: false, error: "Location not found" });
        }

        const jadwalDonor = (lokasiPmiData.Jadwals || []).map((jadwal) => {
            return {
                id_jadwal: jadwal.id_jadwal,
                jadwal_jam_mulai: jadwal.jadwal_jam_mulai,
                jadwal_jam_selesai: jadwal.jadwal_jam_selesai,
                tanggal_donor: moment(jadwal.tanggal_donor).locale('id-ID').format('dddd, DD MMMM YYYY'),
            };
        });

        const formattedData = {
            id_lok_pmi: lokasiPmiData.id_lokasi_pmi,
            nama: lokasiPmiData.nama,
            no_telpon: lokasiPmiData.no_telpon,
            alamat: lokasiPmiData.alamat,
            latitude: lokasiPmiData.latitude,
            longitude: lokasiPmiData.longitude,
            schedules: jadwalDonor,
        };

        res.json({ success: true, message: "success", result: formattedData });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
    }
};

exports.postJadwalDaftar = async (req, res) => {
  try {
    const { id_user, id_lokasi_pmi, id_gol_darah, id_jadwal } = req.body;

    // Check if the user exists
    const user = await User.findOne({ where: { id_user } });
    if (!user) {
      return res.status(404).json({ success: false, message: "User tidak ditemukan" });
    }

    // Check if the provided gol_darah exists
    const golDarah = await GolDarah.findOne({ where: { id_gol_darah } });
    if (!golDarah) {
      return res.status(404).json({ success: false, message: "Invalid gol_darah" });
    }

    // Check if the provided lokasi_pmi exists
    const lokasiPmi = await LokasiPmi.findOne({ where: { id_lokasi_pmi } });
    if (!lokasiPmi) {
      return res.status(404).json({ success: false, message: "Invalid lokasi_pmi" });
    }

    // Check if the provided jadwal exists
    const jadwal = await Jadwal.findOne({ where: { id_jadwal } });
    if (!jadwal) {
      return res.status(404).json({ success: false, message: "Invalid id_jadwal" });
    }

    // Perform the donor registration
    const newDonorRegistration = await TraDonor.create({
      id_user,
      id_gol_darah,
      id_lokasi_pmi,
      id_jadwal,
      // tgl_donor,
      status: 1, // 1 Register
    });

    const formattedTanggalDaftar = moment(newDonorRegistration.createdAt).locale('id-ID').format('dddd, DD MMMM YYYY');
    // const formattedTanggalDonor = moment(newDonorRegistration.tanggal_donor).locale('id-ID').format('dddd, DD MMMM YYYY HH:mm:ss');

    res.json({
      success: true,
      message: "success",
      schedule: {
        id_pendonor: newDonorRegistration.id_tra_donor,
        status_donor: newDonorRegistration.status,
        gol_darah: golDarah.gol_darah,
        lokasi_pmi: lokasiPmi.nama,
        tanggal_daftar: formattedTanggalDaftar,
        tanggal_donor: moment(jadwal.tanggal_donor).locale('id-ID').format('dddd, DD MMMM YYYY'),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({error: true, success: false, error: "Internal Server Error" });
  }
};

exports.searchJadwalDonor = async (req, res) => {
    try {
        const lokasiQuery = req.query.q;
        if (!lokasiQuery) {
            return res.status(400).json({ error: true, message: "Query parameter 'q' is required for search" });
        }

        // Use Sequelize to find all locations based on the name or address
        const lokasiList = await LokasiPmi.findAll({
            where: {
                [Sequelize.Op.or]: [
                    { nama: { [Sequelize.Op.like]: `%${lokasiQuery}%` } },
                    { alamat: { [Sequelize.Op.like]: `%${lokasiQuery}%` } },
                ],
            },
            include: [
                {
                    model: Jadwal,
                    attributes: ["id_jadwal", "jadwal_jam_mulai", "jadwal_jam_selesai", "tanggal_donor"],
                },
            ],
        });


        if (!lokasiList || lokasiList.length === 0) {
            return res.status(404).json({ error: true, message: "Locations not found" });
        }

        // Prepare the response array
        const results = lokasiList.map((lokasi) => {
            return {
                id_lokasi_pmi: lokasi.id_lokasi_pmi,
                nama: lokasi.nama,
                email: lokasi.email,
                no_telpon: lokasi.no_telpon,
                alamat: lokasi.alamat,
                latitude: lokasi.latitude,
                longitude: lokasi.longitude,
                logo: lokasi.logo,
                schedules:  lokasi.Jadwals ? lokasi.Jadwals.map((item) => ({
                    id_jadwal: item.id_jadwal,
                    jadwal_jam_mulai: item.jadwal_jam_mulai,
                    jadwal_jam_selesai: item.jadwal_jam_selesai,
                    tanggal_donor: moment(item.tanggal_donor).locale('id-ID').format('dddd, DD MMMM YYYY'),
                })): [],
            };
        });

        return res.status(200).json({ error: false, message: "success", results });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: true, message: "Internal server error" });
    }
};
