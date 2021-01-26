
//declaration of variables
const url  =  'http://m2-act.test/api/department';
let output = '';
const add = document.getElementById('form-input');
const deptname = document.getElementById('deptname');

//functionalities
retrive();

//refresh the table with new fields and data
const refresh = (dept) =>{
    dept.forEach(department => {
        output +=
              `<tr>
              <td>${department.id}</td>
              <td>${department.Department_Name}</td>
              <td>
                <a href="#" class="btn btn-info" id = "update" onclick="update(${department.id})">Update</a>
                 <a href="#" class="btn btn-danger" id = "delete" onclick="del(${department.id})">Delete</a>
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
        refresh (data['data']);
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
        Department_Name : deptname.value,
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


// update records  the  Department Table using API endpoints as well as the Table in the website
const updatedata = (id,no,input) => {
    switch (no){
         case 1:
             fetch (`${url}/${id}`,{
                 method: 'PATCH',
                 headers: {
                     'Content-Type' : 'application/json'
                 },
                 body: JSON.stringify({
                     Department_Name  : input.toString(),
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

 //get the user input as well as id to update the Department Table.
function update (dept){
    if  (dept != 0){
        var text = prompt ('Update What ? : ')
        switch(text.toUpperCase()){
                case "DEPARTMENT NAME":
                var input = prompt (`ENTER ${text.toUpperCase()} : `)
                updatedata(dept,1,input);
                break
                default:
                alert ("Be specific on your input.\nExample: \nPosition Name \n NOTE : ID is CANNOT BE EDITED." );
                 break
                }  
            }else {
            alert ('Please Try Again..\n Remember : ID is CANNOT BE Edited.');
            }
}

// delete records in the  Department Table
function del (dept){
    if (dept != 0){
        fetch(`${url}/${dept}`,{
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


