const entrySchema = require('../Schema/Entrys');
const errorHandler = require('../Utils/errorHandler');

module.exports.entry = async (req, res) => {
  try {
    const entry = await entrySchema.find().then({
      user: req.user.id
    })
    res.status(200).send(entry)
  } catch (error) {
    errorHandler(res, error)
  }
}

// module.exports.everyEntry = async (req, res) => {
//   try {

//   } catch (error) {
//     errorHandler(res, error)
//   }
// }

module.exports.removeEntry = async (req, res) => {
  try {
    await entrySchema.deleteOne({_id: req.params.id});
    res.status(200).send('Запись удалена');
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.addEntry = async (req, res) => {
  try {
    const entry = await new entrySchema(req.body).save();
    res.status(200).send(entry)
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.changeEntry = async (req, res) => {
  try {
    const entry = await entrySchema.updateOne({_id: req.params.id}, req.body);
    await entry.find()
    res.status(200).send(entry)
  } catch (error) {
    errorHandler(res, error)
  }
}


    
