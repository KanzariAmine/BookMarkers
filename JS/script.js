//Create Event listenr for submit button
$('#myForm').submit((e) => {
    //Get the value from the input
    let siteName = $('#sitename').val();
    let siteUrl = $('#siteURL').val();

    if(!validateFrom(siteName, siteUrl)){
        return false;
    }
   

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
    //Clear Form 
    document.getElementById('myForm').reset();

    //Re-Ftech BookMarks and add in the page
    fectchBookmarks();

    e.preventDefault()
    });

//Fetch BookMarks
function fectchBookmarks(){
    //Get bookmarks from LocalStorage
    let bookMarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Selecte div for output
    let bookmarksResults = $('#bookmarksResults');
    bookmarksResults.empty();
    //Build the Output
    for(let elm in bookMarks){
        let name = bookMarks[elm].name;
        let url = bookMarks[elm].url;
        bookmarksResults.append(`<div  class="well">
            <h3>${name}
                <a class='btn btn-primary' target='_blank' href="${url}">Visit</a>
                <a onClick='deleteBookMarks("${name}")' class='btn btn-danger' href="#">Delete</a>
            </h3>
        </div>`);
    }
}



//Delete Element
function deleteBookMarks(name){
    //Get bookmarks from LocalStorage
    let bookMarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(let elm in bookMarks){
        let nameOfSite = bookMarks[elm].name;
        if(nameOfSite === name){
            //localStorage.removeItem('bookmarks', nameOfSite); delete from the Localstorage
            //delete bookMarks.nameOfSite; delete attribute from Object
            //Remove element from array
            bookMarks.splice(elm, 1);
        }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookMarks));
    fectchBookmarks();
}

//Validate Function
function validateFrom(siteName, siteUrl){
    if(!siteName || !siteUrl){
        alert('Please fill in the form');
        return false;
    }
    let expression =/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
    

    let regex = new RegExp(expression);
    if (!siteUrl.match(regex)) {
        alert('Please use a valid URL');
        return false;
    }
    return true;
}