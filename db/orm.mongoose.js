const mongoose = require('mongoose');
// const bcrypt = require ( 'bcrypt' );

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost:27017/${process.env.DB_NAME}`, {useNewUrlParser: true});

const db = require( './models' );


// include mongoose models (it will include each file in the models directory)

// const bookInfo = {
    //     bookId: books.id,
    //     title: books.volumeInfo.title,
    //     imageThumb: books.volumeInfo.imageLinks.thumbnail,
    //     link: books.volumeInfo.previewLink
    // }

async function saveBook( bookInfo ){
    console.log('in orm file: ', bookInfo)
    const saveBookInfo = {
        bookId: bookInfo.bookId,
        title: bookInfo.title,
        thumbnail: bookInfo.imageThumb,
        link: bookInfo.link
    }
    const dbBook = new db.books( saveBookInfo );

    const saveBook = await dbBook.save();
    if( saveBook._id )
        return { message: `Book  ${saveBook.title}  successfully saved`, id: saveBook._id};
    else
        return { message: "Sorry failed", id: false };
}
async function deleteBook( id ){
    console.log('in orm file: ', id)
    // const saveBookInfo = {
    //     bookId: bookInfo.bookId,
    //     title: bookInfo.title,
    //     thumbnail: bookInfo.imageThumb,
    //     link: bookInfo.link
    // }
    // const dbBook = new db.books( saveBookInfo );
    const myBookList =  await db.books.deleteOne({ _id: id });

    // const saveBook = await dbBook.save();
    if( myBookList._id )
        return { message: `Book  ${saveBook.title}  successfully deleted`, id: myBookList._id};
    else
        return { message: "Sorry failed", id: false };
}
async function loadBook(){
    // const dbBook = db.books( );

    const myBookList =  await db.books.find({})
    console.log('my list in orm is myBookList: ', myBookList);
    return myBookList;
}


// /api/saveBook


module.exports = {
    saveBook,
    loadBook,
    deleteBook

};