
//declaration of variables
const url  =  'http://m2-act.test/api/position';
let output = '';
const add = document.getElementById('form-input');
const posname = document.getElementById('postname');
const Deptcode = document.getElementById('deptcode');

//functionalities
retrive();

//refresh the table with new fields and data
const refresh = (post) =>{
    post.forEach(position => {
        output +=
              `<tr>
              <td>${position.id}</td>
              <td>${position.Position_Name}</td>
              <td>${position.Department_Code}</td>
              <td>
                <a href="#" class="btn btn-info" id = "update" onclick="update(${position.id})">Update</a>
                 <a href="#" class="btn btn-danger" id = "delete" onclick="del(${position.id})">Delete</a>
              </td>
            </tr>`
    });
    document.getElementById('table-body').innerHTML = output;
}

//Retrive all the information on the Department Table
function retrive() {
    fetch (url)
    .then ((res) => res.json())
    .then ((data) => {
        refresh (data.data);
    })
    .catch ((error) => {
            console.log(error);
    })
}

//add a new record in the Department Table using API endpoints.
add.addEventListener('submit', (e) =>{
  e.preventDefault();
  fetch(url,{
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
            'Accept' : 'application/json',
    },
    body:JSON.stringify({
        Position_Name : posname.value,
        Department_Code : Deptcode.value,
    }),
  })
  .then ((res) => res.json())
  .then ((data) => {
        refresh(data);
  })
  .catch((error) =>{
      console.log(error);
  });
})


// update records in the  Position Table as well as the Table in the website
const updatedata = (id,no,input) => {
    switch (no){
         case 1:
             fetch (`${url}/${id}`,{
                 method: 'PATCH',
                 headers: {
                     'Content-Type' : 'application/json'
                 },
                 body: JSON.stringify({
                     Position_Name  : input.toString(),
                 }),
               })
               .then (res => res.json())
               .then (() => location.reload())
               .catch ((error) =>{
                     console.log (error);
               })
         break
         case 2:
             fetch (`${url}/${id}`,{
                 method: 'PATCH',
                 headers: {
                     'Content-Type' : 'application/json'
                 },
                 body: JSON.stringify({
                     Department_Code  : input.toString(),
                 }),
               })
               .then (res => res.json())
               .then (() => location.reload())
               .catch ((error) =>{
                     console.log (error);
               })
         break
         default:
             console.log ("Sorry an Error Occured."); 
         break;
     }
 }

 // one of the user input which get the user input.
function update (pos){
    if  (pos != 0){
        var text = prompt ('Update What ? : ')
        switch(text.toUpperCase()){
            case "POSITION NAME":
                var input = prompt (`ENTER ${text.toUpperCase()} : `)  
               updatedata(pos,1,input);
                break
                case "DEPARTMENT CODE":
                var input = prompt (`ENTER ${text.toUpperCase()} : `)
                updatedata(pos,2,input);
                break
                default:
                alert ("Be specific on your input.\nExample: \n   Position Name OR Department Code" );
                 break
                }  
            }else {
            console.log ('Please Try Again..')
            }
}

// delete records in the  Position Table
function del (pos){
    if (pos != 0){
        fetch(`${url}/${pos}`,{
            method: 'DELETE',
        })
        .then(() => location.reload())
        .catch((error)=>{
            console.log(error);
        })      
    }else{
        console.log ('Button not Click Yet.')
    }
}


