const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../Config/Keys');
const Users = require('../Schema/Users');
const errorHandler = require('../Utils/errorHandler');

module.exports.login = async (req, res) => { 
  const candidate = await Users.findOne({email: req.body.email})
  if(candidate){
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password);
    if(passwordResult){
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60 * 24});
      res.send({
        token: `${token}`
      })
    } else {
      res.send('Неверный пароль. Попробуйте снова')
    }
  } else {
    res.send('Пользователь с таким адресом не найден')
  }
}

module.exports.register = async (req, res) => {
  const candidate = await Users.findOne({email: req.body.email})
  if(candidate){
    res.send('Пользователь с таким адресом уже существует')
  } else {
    const salt = bcrypt.genSaltSync(10);
    const password = req.body.password;
    const user = new Users({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })
    const token = jwt.sign({user}, keys.jwt, {expiresIn: 60 * 60});
    try {
      await user.save();
      res.send({
        token: `${token}`
      })
    } catch(error) {
      errorHandler(error);
    }
  }
}