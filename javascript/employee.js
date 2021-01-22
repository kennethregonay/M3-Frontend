const postlist = document.querySelector('post-list');
const api = 'http://m2-act.test/api/employee';

//Get all data
fetch(api)
.then (res => res.json())
.then(data => {
   data = JSON.parse(data);
   data.array.forEach(element => {
       console.log(element);
   });
    });