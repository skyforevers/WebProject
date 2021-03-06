var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  email: {type: String, required: true, index: true, trim: true},
  title: {type: String, required: true},
  content: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  read: {type: Number, default: 0},
  address: {type: String, required: true},
  postcode: {type: String, required: true},
  address2: {type: String, required: true}, 
  sido: {type: String},
  pay: {type: String, required: true},
  infra: {type: String, required: true},
  rule: {type: String, required: true}
}, {  
  toJSON: {virtuals : true},
  toObject: {virtuals: true}
});

var Post = mongoose.model('Post', schema);

module.exports = Post;
