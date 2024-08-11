const mongoose = require('mongoose');

const dataEntrySchema = new mongoose.Schema({
  type: { type: String, required: true, lowercase: true },
  date: { type: Date, default: Date.now },
  value: { type: Number, required: true , default:0},
  units: { type: String, required: true, enum: ['KL', '%', 'Degrees Celsius', 'Hours'] },
});

const DataEntry = mongoose.model('DataEntry', dataEntrySchema);

module.exports = DataEntry;
