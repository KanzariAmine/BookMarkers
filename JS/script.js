//Create Event listenr for submit button
$('.btn').click(() => {
    //Get the value from the input
    let siteName = $('#sitename').val();
    let siteUrl = $('#siteURL').val();

    let bookMark = {
        name: siteName,
        url: siteUrl
    }
    if(localStorage.getItem('bookmarks') === null){
        //Init the TAB
        let bookMarks =  [];
        //Set the Bookmark Obj in the TAB
        bookMarks.push(bookMark);
        //Set The Tab of bookMarks in LocalStorage after stringify 
        localStorage.setItem('bookmarks', JSON.stringify(bookMarks)) 
    }else{
        //Get bookmarks from LocalStorage and tronsform in object
        let bookMarks = JSON.parse(localStorage.getItem('bookmarks'));
        //set the new element in the array
        bookMarks.push(bookMark);
        //Re set book to LocalStorage
        localStorage.setItem('bookmarks', JSON.stringify(bookMarks))
    }
   
});