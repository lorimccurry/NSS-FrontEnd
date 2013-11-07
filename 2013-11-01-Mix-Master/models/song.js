var mongoose = require('mongoose');

//Schema defined

var Song = mongoose.Schema({
  title:    { type: String, required: [true, 'song title required.'],
            match: [/^[0-9a-zA-Z]+[0-9a-zA-Z ]*$/,
            '{VALUE} is an invalid title.' ]},
  duration: {type: Number, required: [true, 'song duration must be at least 1 second.'],
            match: [/^[1-9][0-9]*$/,
            '{VALUE} is an invalid song duration.' ]},
  genres:   [{type: mongoose.Schema.Types.ObjectId, ref: 'Genre'}],
  art:      { type: String, required: [false, 'art must end in .png or .jpeg.'],
            //match: [/^[0-9a-zA-Z]+[0-9a-zA-Z ]*\.
            match: [/^[a-zA-Z0-9\:\-\.\/_]+\.(png|jpeg|jpg)$/,
            '{VALUE} is an invalid image file extension.' ]},
  filename: { type: String, required: [false, 'music must end in .mp3, mp4, .m4a, .wav, ogg.'],
            match: [/^[0-9a-zA-Z]+[0-9a-zA-Z ][0-9a-zA-Z_]*\.(mp3|mp4|m4a|wav|ogg)$/,
            '{VALUE} is an invalid music file extension.' ]},
  lyrics:   String,
  createdAt: {type: Date, default: Date.now}
});

//Model defined
mongoose.model('Song', Song);