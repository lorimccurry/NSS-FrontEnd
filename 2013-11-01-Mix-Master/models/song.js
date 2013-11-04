var mongoose = require('mongoose');

//Schema defined

var Song = mongoose.Schema({
  title:    String,
  duration: Number,
  genres:   [String],
  art:      String,
  filename: String,
  lyrics:   String,
  createdAt: {type: Date, default: Date.now}
});

//Model defined
mongoose.model('Song', Song);