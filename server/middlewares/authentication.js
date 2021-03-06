/**
 * 1. Decode jwt? jwt isinya email => digunakan untuk cek, ini user terdaftar gak di database
 * 2. Kalau dia terdaftar, dia bisa akses endpoint
 * 3. Kalau dia tidak terdaftar, proses authenticationnya gagal.
 */

const { User } = require("../models");
const { verifyToken } = require("../helpers/jwt");

const authentication = async (req, res, next) => {
  try {
    // Untuk mengambil token ngambilnya dari headers
    let { token } = req.headers;
    let decoded = verifyToken(token);
    // console.log(decoded, "<== decoded");

    const user = await User.findOne({
      where: { email: decoded.email },
    });

    if (!user) throw { name: "AuthenticationFailed!" };
    req.userData = decoded;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = { authentication };
