// profileController.js
const Validator = require("fastest-validator");
const { User } = require("../models");

const v = new Validator({
  useNewCustomCheckerFunction: true,
  messages: {
    phoneNumber: "The phone number must be started with '0'!",
  },
});

// Controller function to get user profile
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id_user: req.user.userId } });

    if (!user) {
      return res.status(404).json({error: true, message: "User not found" });
    }

    res.status(200).json({error: false, message: "success", user });
  } catch (error) {
    console.error("Error retrieving user profile:", error);
    res.status(500).json({error: true, message: "Internal server error" });
  }
};

// Controller function to update user profile
exports.updateUserProfile = async (req, res) => {
  try {
    const user = await User.findOne({ where: { id_user: req.user.userId } });

    if (!user) {
      return res.status(404).json({ error: true, message: "User not found" });
    }

    const schema = {
      nama: "string|optional",
      email: "email|optional",
      alamat: "string|optional",
      jenis_kelamin: "string|optional",
      tanggal_lahir: {
        type: "date",
        convert: true,
        optional: true,
      },
      id_gol_darah: "string|optional",
      no_hp: {
        type: "string",
        optional: true,
        check(value, errors) {
          if (value && !value.startsWith("0")) {
            errors.push({
              type: "phoneNumber",
              message: "The phone number must be started with '0'!",
            });
          }
        },
      },
      sts_volunteer: "number|optional",
      phoneNumber: { type: "string", optional: true },
    };

    const validate = v.validate(req.body, schema);

    if (validate.length) {
      return res.status(400).json(validate);
    }

    // Update user data
    await user.update(req.body);

    // Get updated user data
    const updatedUser = await User.findOne({ where: { id_user: req.user.userId } });

    res.json({ error: false, message: "success", user: updatedUser });
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: true, message: "Internal server error" });
  }
};
