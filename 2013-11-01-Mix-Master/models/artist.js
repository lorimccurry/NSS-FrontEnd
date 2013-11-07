var mongoose = require('mongoose');

//Schema defined

var Artist = mongoose.Schema({
  name:    {  type: String, required: [true, 'name is required.'],
              match: [/^[a-zA-Z]+[a-zA-Z ]+$/,
              '{VALUE} is an invalid name.' ]},
  photo:   {  type: String, required: [false, 'photo must end in .png, .jpeg, or .jpg.'],
              match: [/^[a-zA-Z0-9\:\-\.\/_]+\.(png|jpeg|jpg)$/,
              '{VALUE} is an invalid image file extension.' ]},
  website: {  type: String, required: [false, 'enter a valid url'],
              match: [/^http\:\/\/[a-zA-Z0-9\-\.]+\.(com|org|net|mil|edu|COM|ORG|NET|MIL|EDU)$/,
              '{VALUE} is an invalid url.' ]},
  bio:     String,
  songs:   [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'}], //will take an array of object ids and turn to real song objects; from mongoose site docs
  createdAt: {type: Date, default: Date.now}
});

//Model defined
mongoose.model('Artist', Artist);