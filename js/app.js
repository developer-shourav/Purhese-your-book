
const searchInput = document.getElementById('input-field');
const massage = document.getElementById('error-div');
const resultsDiv = document.getElementById('results-div');


const searchBooks = () => {
      // get input field data
       const inputValue = searchInput.value ;
      //create url using search value

      //clear dom 
      resultsDiv.innerHTML ="";
      
       const url = `https://openlibrary.org/search.json?q=${inputValue}`;

       fetch(url)
       .then(res => res.json())
       .then(data => showData(data))

}

const showData = (values) =>{
     const books = values.docs ;
     // error handaling and total result counting
     if(searchInput.value === ""){
           massage.innerText = `Search field cann't be Empty`;
     }
    
     else if(values.numFound === 0){
           massage.innerText = `No result found ,Please enter proper book's name`;
           searchInput.value ='';


     }
      else{
           massage.innerText = `Search for"${searchInput.value}" and result found " ${books.length} " `;

     }

     books.forEach(book => {
           const div = document.createElement('div');
           div.innerHTML = `
           <div class="col h-100">
              <div class="card h-100 shadow-lg rounded-3 border-0">
              <div class="w-50 mx-auto my-3 shadow-sm rounded-2 border"  ><img src="https://covers.openlibrary.org/b/id/${book.cover_i ? book.cover_i :'' }-M.jpg"    class="card-img-top" alt="..."></div>
                  <div class="card-body">
                        <h5 class="card-title">Book name: ${book.title}</h5>
                        <hr>
                        <p ><strong>Author:${book.author_name ? book.author_name[0]: '' } </strong> </p> 
                        <p ><b>Publisher:${book.publisher ? book.publisher[0]: '' }</b> </p>
                        <p class="d-inline-block">First Published : ${book.first_publish_year ? book.first_publish_year: '' } </p> 
                        <p class="d-inline-block ms-5" >Editon count:${book.edition_count ? book.edition_count :''}</p>
                        <p>Version:${book._version_ ? book._version_ :""}</p>
            
                  </div>
              </div>
            </div> 
           `;
           resultsDiv.appendChild(div);
           // clear search field 
           searchInput.value = ''
     
      });
}