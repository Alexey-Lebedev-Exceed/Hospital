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
    errorHandler(res, error)
  }
}

module.exports.removeEntry = async (req, res) => {
  try {
    await entrySchema.deleteOne({_id: req.query._id});
    entrySchema.find().then(result => {
      res.send(result);
    })
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
    await entrySchema.updateOne({_id: req.body._id}, req.body);
    entrySchema.find().then(result => {
      res.send(result)
    })
  } catch (error) {
    errorHandler(res, error)
  }
}


    
