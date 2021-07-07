const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// const saveBookInfo = {
//     bookId: bookInfo.bookId,
//     title: bookInfo.title,
//     thumbnail: bookInfo.imageThumb,
//     link: bookInfo.link
// }

let books = new Schema ({
    bookId :  { type: String, trim: true },
    title :  { type: String, trim: true },
    thumbnail :  { type: String },
    link :  { type: String }
}, {
   timestamps: true /* creates corresponding timestamp fields: createdAt, updatedAt */
});

module.exports = mongoose.model('books', books);