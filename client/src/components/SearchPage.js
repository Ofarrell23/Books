import React, { useState, useRef }  from 'react'
import heroImg from './assets/paul-schafer-t6oZEgL0z18-unsplash.jpg'
import BookList from './BookList';

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop); 

function SearchPage(props) {

    const myRef = useRef(null)
    // const executeScroll = () => 

    const searchStyle= {
        height: '85vh',
        backgroundImage: `url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPositionY: '-174px'
    }
    const myForm={
        width: '70%',
        margin: '160px auto'
    }
    const myInput={
        borderTopLeftRadius: '20px',
        borderRadius: '20px',
        borderBottomLeftRadius: '20px'
    }
    const myBtnRgt={
        width: '150px',
        padding: '10px',
        backgroundColor: '#ed145b',
        borderRadius: '20px',
        marginLeft: '20px',
        cursor: 'pointer'
    } 

    const [ searchInput, setSearchInput ] = useState("");
    const [ bookList, setBookList ] = useState([]);
    const [ showList, setShowList ] = useState([]);
    
    function handleInputChange( e ){
        const newInput = e.target.value;
        setSearchInput( newInput );
    }
    async function setResultBooks( ){
        console.log(`[setResultBooks] called with '${searchInput}'`);
        const bookResult = await fetch( `https://www.googleapis.com/books/v1/volumes?q=${searchInput}` ).then( result=>result.json() );

        setBookList( bookResult.items );
        console.log( 'booklist: ', bookResult.items); 
        scrollToRef(myRef);

    }
    return (
        <div id='something'>
            <div class="jumbotron jumbotron-fluid hero" style={searchStyle}>
                <div class="searchBox container">
                    <div class="input-group mb-3 text-center" style={myForm}>
                        <input onChange={handleInputChange} value={searchInput} type="text" class="form-control text-center" style={myInput} placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="basic-addon2"/>
                        <div class="myBtnRgt" onClick={function(){ setResultBooks()}}>Search Books</div>
                    </div>
                </div>
            </div>
            <BookList bookList={bookList} myRef={myRef} />
        </div>
    )
}

export default SearchPage;
