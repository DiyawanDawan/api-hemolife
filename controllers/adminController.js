// const { format } = require('date-fns');
const { nanoid } = require("nanoid");

const { BankDarah, GolDarah, LokasiPmi, TraDonor, Jadwal, User, Blogs, Admin } = require("../models");

const Validator = require("fastest-validator");

const v = new Validator();

// Mendapatkan data semua jumlah kantong darah
const getAllBloodBank = async (req, res) => {
	try {
		const bankDarah = await BankDarah.findAll({
			include: [
				{ model: LokasiPmi, attributes: ["nama"] },
				{ model: GolDarah, attributes: ["gol_darah"] },
			],
		});

		if (bankDarah) {
			const result = {
				message: "Sukses menampilkan seluruh bank darah",
				data: bankDarah,
			};
			res.status(200).json(result);
		} else {
			const error = {
				message: "Data tidak ditemukan!",
				data: null,
			};
			res.status(404).json(error);
		}
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			serveMessage: error,
		});
	}
};

// Mendapatkan jumlah kantong darah berdasarkan id lokasi pmi
const getBloodBankByPmiId = async (req, res) => {
	try {
		const idLokPmi = req.params.id;
		const bankDarah = await BankDarah.findAll({
			where: {
				id_lokasi_pmi: idLokPmi,
			},
			include: [
				{ model: LokasiPmi, as: "LokasiPmi" },
				{ model: GolDarah, as: "GolDarah" },
			],
		});

		if (bankDarah.length > 0) {
			const result = {
				message: `Bank darah dengan id lokasi pmi ${idLokPmi} berhasil ditampilkan`,
				stok_bank_darah: bankDarah,
			};
			res.status(200).json(result);
		} else {
			const error = {
				message: "Data tidak ditemukan!",
				stok_bank_darah: null,
			};
			res.status(404).json(error);
		}
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			serveMessage: error,
		});
	}
};

// Mengupdate jumlah kantong darah berdasarkan id lokasi pmi
const updateBloodBankByPmiId = async (req, res) => {
	try {
		const { jumlah_kantong_darah, id_gol_darah } = req.body;

		const bankDarah = await BankDarah.findOne({
			where: { id_lokasi_pmi: req.params.id },
			include: [
				{
					model: GolDarah,
					where: { id_gol_darah: id_gol_darah },
				},
			],
		});

		if (!bankDarah) {
			const error = {
				message: "Data tidak ditemukan!",
				stok_bank_darah: null,
			};
			res.status(404).json(error);
		}

		const schema = {
			jumlah_kantong_darah: "number|optional",
		};

		const validate = v.validate(req.body, schema);

		if (validate.length) {
			return res.status(400).json(validate);
		}

		const updateBankDarah = await bankDarah.update({
			jumlah_kantong_darah: jumlah_kantong_darah,
		});

		const result = {
			message: "Jumlah kantong darah berhasil diubah",
			stok_bank_darah: updateBankDarah,
		};
		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			serveMessage: error,
		});
	}
};

// Mendapatkan semua data pendonor darah
const getAllBloodDonors = async (req, res) => {
	try {
		const pendonor = await TraDonor.findAll({
			attributes: [
				"id_tra_donor",
				"id_user",
				"id_gol_darah",
				"id_lokasi_pmi",
				"tgl_donor",
				"status",
			],

			include: [
				{
					model: User,
					attributes: [
						"id_user",
						"nama",
						"email",
						"no_hp",
						"jenis_kelamin",
						"tanggal_lahir",
						"alamat",
					],
				},
				{ model: GolDarah, attributes: ["gol_darah"] },
				{ model: LokasiPmi, attributes: ["nama", "alamat"] },
			],
		});

		if (pendonor.length > 0) {
			const result = {
				message: "Berhasil menampilkan seluruh pendonor darah",
				pendonor: pendonor,
			};
			res.json(result);
		} else {
			const error = {
				message: "Pendonor darah tidak ditemukan!",
				pendonor: null,
			};
			res.status(404).json(error);
		}
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			serveMessage: error,
		});
	}
};

// Profil admin
const adminProfile = async (req, res) => {
	try {
		const admin = await Admin.findOne({
			where: { id_admin: req.user.adminId },
		});

		if (!admin) {
			const error = {
				message: "Admin not found",
				admin: null,
			};
			return res.status(404).json(error);
		} else {
			const result = {
				message: "Admin profile retrieved successfully",
				admin: admin,
			};
			res.status(200).json(result);
		}
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			serveMessage: error,
		});
	}
};

// Update profil admin
const updateAdminProfile = async (req, res) => {
	try {
		const admin = await Admin.findOne({
			where: { id_admin: req.user.adminId },
		});

		if (!admin) {
			const error = {
				message: "Admin not found",
				admin: null,
			};
			return res.status(404).json(error);
		}

		const schema = {
			nama: "string|optional",
			email: "email|optional",
		};

		const validate = v.validate(req.body, schema);

		if (validate.length) {
			return res.status(400).json(validate);
		}

		const { nama, email } = req.body;

		const updateAdminProfile = await admin.update({
			nama,
			email,
		});

		const result = {
			message: "Admin profile updated successfully",
			admin: updateAdminProfile,
		};

		res.status(200).json(result);
	} catch (error) {
		res.status(500).json({
			message: "Server Error",
			serveMessage: error,
		});
		console.log(error);
	}
};

const postJadwalDonorDarahPMI = async (req, res) => {
	try {
	  const { id_lokasi_pmi,  tanggal_donor, jadwal_hari, jadwal_jam_mulai, jadwal_jam_selesai } = req.body;

	  // Lakukan validasi input, pastikan nilai-nilai tidak kosong atau sesuai dengan aturan

	  // Cari ID lokasi PMI berdasarkan nama lokasi
	  const lokasiPmi = await LokasiPmi.findOne({
		where: { id_lokasi_pmi },
	  });

	  if (!lokasiPmi) {
		return res.status(404).json({
		  success: false,
		  error: "Lokasi PMI tidak ditemukan",
		});
	  }

	  // Simpan data ke database
	  const newJadwal = await Jadwal.create({
		id_jadwal: nanoid(5),
		id_lokasi_pmi: lokasiPmi.id_lokasi_pmi,
		tanggal_donor,
		jadwal_hari,
		jadwal_jam_mulai,
		jadwal_jam_selesai,
	  });
	//   const formattedTanggalDonor = format(newJadwal.tanggal_donor, 'yyyy-MM-dd');
		const formattedTanggalDonor = new Date(newJadwal.tanggal_donor).toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});

	  res.status(201).json({
		success: true,
		message: "Jadwal pendonoran darah berhasil ditambahkan",
		data: {
			alamat_pmi: lokasiPmi.alamat,
			id_lok_pmi: lokasiPmi.id_lokasi_pmi,
			tanggal_donor: formattedTanggalDonor,
			// tanggal_donor: formattedTanggalDonor,
			jadwal_jam_mulai: newJadwal.jadwal_jam_mulai,
			jadwal_jam_selesai: newJadwal.jadwal_jam_selesai,
			jadwal_hari: newJadwal.jadwal_hari,
			latitude: lokasiPmi.latitude,
			longitude: lokasiPmi.longitude,
			nama_lok_pmi: lokasiPmi.nama,
		  },
	  });
	} catch (error) {
	  console.error(error);
	  res.status(500).json({
		success: false,
		error: "Internal Server Error",
	  });
	}
  };

const addBlogPosts = async (req, res)  => {
	try {
		// Ambil data dari body request
		const { judul, konten, penulis, tanggal_publikasi } = req.body;
		const formattedTanggalPublikasi = new Date(tanggal_publikasi).toLocaleDateString('id-ID', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
		// Tambahkan data baru ke tabel "blogs"
		const newBlog = await Blogs.create({
			judul,
			konten,
			penulis,
			tanggal_publikasi,
		});

		res.status(201).json({
			success: true,
            data: {
                ...newBlog.toJSON(),
                tanggal_publikasi: formattedTanggalPublikasi,
            },
			message: 'Blog berhasil ditambahkan',
		});
	} catch (error) {
		console.error(error);
		res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });

	}
}
module.exports = {
	getAllBloodBank,
	getBloodBankByPmiId,
	updateBloodBankByPmiId,
	getAllBloodDonors,
	adminProfile,
	updateAdminProfile,
	postJadwalDonorDarahPMI,
	addBlogPosts
};
