const mongoose = require('mongoose');

const comicBookSchema = mongoose.Schema({
  bookName: {
     type: String, 
     required: true  //book name which is required
  },
  authorName: { 
    type: String, 
    required: true 
  },
  yearOfPublication: { 
    type: Number, 
  },
  price: { 
    type: Number, 
    required: true 
  },
  discount: {
     type: Number, 
     default: 0 
  },
  numberOfPages: {
     type: Number, 
  },
  condition: {
    type: String, 
    enum: ['new', 'used'],// enum to choose as new or used only
    required: true 
  },
  description: { 
    type: String 
  },
}, { timestamps: true, } //provides created and updated time
);

module.exports = mongoose.model('ComicBook', comicBookSchema);
