const entrySchema = require('../Schema/Entrys');
const errorHandler = require('../Utils/errorHandler');

module.exports.entry = async (req, res) => {
  try {
    const entry = await entrySchema.find({
      user: req.user.userId
    }).then(result => {
       res.send(result)
    })
  } catch (error) {
    res.status(403).send(error);
    // errorHandler(res, error)
  }
}

module.exports.removeEntry = async (req, res) => {
  try {
    await entrySchema.deleteOne({_id: req.params.id});
    res.send('Запись удалена');
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.addEntry = async (req, res) => {
  try {
    req.body.user = req.user.userId;
    const entry = await new entrySchema(req.body);
    entry.save().then(result => {
      res.send(result)
    });
  } catch (error) {
    errorHandler(res, error)
  }
}

module.exports.changeEntry = async (req, res) => {
  try {
    const entry = await entrySchema.updateOne({_id: req.params.id}, req.body);
    await entry.find()
    res.send(entry)
  } catch (error) {
    errorHandler(res, error)
  }
}


    
