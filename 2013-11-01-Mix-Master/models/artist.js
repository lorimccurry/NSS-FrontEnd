var mongoose = require('mongoose');

//Schema defined

var Artist = mongoose.Schema({
  name:    String,
  photo:   String,
  website: String,
  bio:     String,
  songs:   [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}], //will take an array of object ids and turn to real song objects; from mongoose site docs
  createdAt: {type: Date, default: Date.now}
});

//Model defined
mongoose.model('Artist', Artist);