var mongoose = require('mongoose');

//Schema defined

var Genre = mongoose.Schema({
  name:      { type: String, required: [true, 'name is required.'],
                match: [/^[a-zA-Z]+[a-zA-Z ]+$/,
                '{VALUE} is an invalid name.' ]}, //required validator: from: http://mongoosejs.com/docs/api.html#schematype_SchemaType-required
  //2 validators in the field and custom validator messages
  songs:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  createdAt: {type: Date, default: Date.now}
});

//Model defined
mongoose.model('Genre', Genre);