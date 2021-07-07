import React, { useState}  from 'react'
import { Link, useLocation } from "react-router-dom";

function BookList(props) {
    const location = useLocation();
    const messageStyle = {
        // width: '50%',
        position: 'sticky',
        top: '0',
        left: '0'
    }

    const [ alertMessage, setAlertMessage ] = useState( { type: "", message: ""} );
    async function saveBook( books){
        
        const bookInfo = {
            bookId: books.id,
            title: books.volumeInfo.title,
            imageThumb: books.volumeInfo.imageLinks && books.volumeInfo.imageLinks.thumbnail ? books.volumeInfo.imageLinks.thumbnail: 'https://cdn1.vectorstock.com/i/1000x1000/21/85/white-blank-book-cover-isolated-template-empty-vector-25362185.jpg' ,
            link: books.volumeInfo.previewLink
        }
        
        console.log('bookInfo ', bookInfo);
        const apiResult = await fetch('/api/saveBook', 
            {   method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bookInfo)
        }).then( result=>result.json() );
        
        console.log('apiResult: ', apiResult);

        if( apiResult.message ){
            setAlertMessage( { type: 'success', message: apiResult.message } );
            setTimeout( function(){ setAlertMessage( {} ); }, 3000 );
        } else {
            setAlertMessage( { type: 'danger', message: apiResult.error } );
            setTimeout( function(){ setAlertMessage( {} ); }, 2500 );
        }
    }

    console.log(`booklist is `,  props.bookList)
    return (
        <div ref={props.myRef}>
            <div style={messageStyle} className={ alertMessage.type ? `alert alert-${alertMessage.type}` : 'd-hide' } role="alert">
                {alertMessage.message}
            </div>
            <div class="mb-3">
                { props.bookList ? props.bookList.map( books =>
                    <div class="something container">
                        <div class="bookImg"> 
                            {books.volumeInfo.imageLinks && books.volumeInfo.imageLinks.thumbnail ? <img src={books.volumeInfo.imageLinks.thumbnail}  /> : <img src='https://cdn1.vectorstock.com/i/1000x1000/21/85/white-blank-book-cover-isolated-template-empty-vector-25362185.jpg'  /> }
                        </div>
                        <div class="bookDesc"> 
                            <h4>{books.volumeInfo.title}</h4>
                                {books.volumeInfo.imageLinks && books.volumeInfo.authors ? <ul>{books.volumeInfo.authors.map( author =><li>{author}</li>)}</ul> : '[no author]' }
                            <p>{books.volumeInfo.description}</p>
                            <div class="d-flex justify-content-start">
                                <a class="myBtn2" href={books.volumeInfo.previewLink}>preview</a>
                                <div class="myBtn2" onClick={function(){ saveBook(books)}}>save</div>
                            </div>
                        </div>
                    </div>
                ) : 'No Books'}
            </div>
        </div>
    )
}

export default BookList;
