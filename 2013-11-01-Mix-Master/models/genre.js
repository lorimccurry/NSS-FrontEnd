var mongoose = require('mongoose');

//Schema defined

var Genre = mongoose.Schema({
  name:      { type: String, match: /^[a-zA-Z]+[a-zA-Z ]$/ }, //required validator: from: http://mongoosejs.com/docs/api.html#schematype_SchemaType-required
  songs:     [{ type: mongoose.Schema.Types.ObjectId, ref: 'Song' }],
  createdAt: {type: Date, default: Date.now}
});

//Model defined
mongoose.model('Genre', Genre);