const bcrypt = require("bcryptjs");

const hashPass = (password) => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(password, salt);
};

const comparePass = (password, hashedPassword) => {
  return bcrypt.compareSync(password, hashedPassword);
};
module.exports = { hashPass, comparePass };
