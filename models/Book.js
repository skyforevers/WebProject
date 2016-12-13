var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var schema = new Schema({
  hostEmail: {type: String, required: true, index: true, trim: true},
  customerEmail: {type: String, required: true, index: true, trim: true},
  name: {type: String, requird: true},
  address: {type: String, required: true},
  pay: {type: String, required: true},
  createdAt: {type: Date, default: Date.now},
  dateFirst: {type: Date},
  dateLast: {type: Date},
  people: {type: Number, default: 0, required:true},
  title: {type: String},
  status: {type: String, default: "normal"}
}, {  
  toJSON: {virtuals : true},
  toObject: {virtuals: true}
});

var Book = mongoose.model('Book', schema);

module.exports = Book;
