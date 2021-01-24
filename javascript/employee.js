const postlist = document.querySelector('post-list');
const api = 'http://m2-act.test/api/employee';
let output = '';

//Getting all the data from the api.
fetch(api)
.then((res) => res.json())
.then((data => {
 let emp = data['data'];
 emp.forEach(employee => {
    output += '<div class="card col-md-4 bg-light" > <div class="card-body"> \ 
     <h5 class="card-title">Card title</h5>\
     <h6 class="card-subtitle mb-2 text-muted">\
     Card subtitle</h6><p class="card-text">\
     Some quick example text to build on the card title and make up the bulk of the cards content.</p>\
     <a href="#" class="card-link">Update</a>\
     <a href="#" class="card-link">\
     Delete</a></div></div>';
   });
   postlist.innerHTML = output;
}))
.catch((error) => {
    console.log(error);
})

