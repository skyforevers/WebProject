var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  email: {type: String, required: true, index: true, trim: true},
  password: {type: String},
  title: {type: String, required: true},
  content: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  read: {type: Number, default: 0},
  city: {type: String, required: true},
  address: {type: String, required: true},
  pay: {type: Number, default: 0, required: true},
  infra: {type: String, required: true},
  rule: {type: String, required: true}
}, {  
  toJSON: {virtuals : true},
  toObject: {virtuals: true}
});

var Post = mongoose.model('Post', schema);

module.exports = Post;
