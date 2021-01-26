//declarations of variables
const api = 'http://m2-act.test/api/employee';
let output = '';
const add = document.getElementById('form-input');
const fname = document.getElementById('fname');
const mname = document.getElementById('mname');
const lname = document.getElementById('lname');
const address = document.getElementById('address');
const gender = document.getElementById('gender');
const bdate = document.getElementById('bdate');
const poscode = document.getElementById('poscode');
 


// Retriving Records in the Employee Table.
const  getdata = (emp) => {
    emp.forEach(employee => {
        output 
        += `<tr>
            <td>${employee.Firstname}</td>
            <td>${employee.MiddleName}</td>
            <td>${employee.Lastname}</td>
            <td>${employee.Address}</td>
            <td>${employee.Gender}</td>
            <td>${employee.Birthdate}</td>
            <td>${employee.Position_Code}</td>
            <td>
              <a href="#" class="btn btn-info" id = "update" onclick="update(${employee.id})">Update</a>
               <a href="#" class="btn btn-danger" id = "delete" onclick="del(${employee.id})">Delete</a>
            </td>
          </tr>`;
          });
            document.getElementById('table-body').innerHTML = output;
}

//update process/ functionalities
const updatedata = (id,no,input) => {
   switch (no){
       case 1:
          fetch (`${api}/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                Firstname  : input.toString(),
            }),
          })
          .then (res => res.json())
          .then (() => location.reload())
          .catch ((error) =>{
                console.log (error);
          })
       break;
       case 2:
        fetch (`${api}/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                Middlename  : input.toString(),
            }),
          })
          .then (res => res.json())
          .then (() => location.reload())
          .catch ((error) =>{
                console.log (error);
          })
       break;
       case 3:
        fetch (`${api}/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                Lastname  : input.toString(),
            }),
          })
          .then (res => res.json())
          .then (() => location.reload())
          .catch ((error) =>{
                console.log (error);
          })
       break
       case 4:
        fetch (`${api}/${id}`,{
            method: 'PATCH',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({
                Address  : input.toString(),
            }),
          })
          .then (res => res.json())
          .then (() => location.reload())
          .catch ((error) =>{
                console.log (error);
          })
        break;
        case 5:
            fetch (`${api}/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    Gender  : input.toString(),
                }),
              })
              .then (res => res.json())
              .then (() => location.reload())
              .catch ((error) =>{
                    console.log (error);
              })
        break;
        case 6:
            fetch (`${api}/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    Birthdate  : input.toString(),
                }),
              })
              .then (res => res.json())
              .then (() => location.reload())
              .catch ((error) =>{
                    console.log (error);
              })
        break
        case 7:
            fetch (`${api}/${id}`,{
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({
                    Position_Code  : input.toString(),
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


// get all the data in the Emloyee table
fetch(api)
.then((res) => res.json())
.then(data => getdata(data['data']))  
.catch((error) => {
    console.log(error);
})



// Add a new Record in the Employee Table
add.addEventListener('submit',(e) => {
    e.preventDefault();
    fetch (api,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
        },
        body:JSON.stringify({
            Firstname  : fname.value,
            Middlename : mname.value,
            Lastname   : lname.value,
            Address : address.value,
            Gender : gender.value,
            Birthdate : bdate.value,
            Position_Code : poscode.value,
        }),
    })
    .then ((res) => (res.json()))
    .then (data =>{
        getdata(data);
        location.reload();
    })
    .catch((error) => {
        console.log(error);
        location.reload();
    })
})


// Delete Records in the Employee Table
function del (emp){
    if (emp != 0){
        fetch(`${api}/${emp}`,{
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

// update the Employee Table using the API Breakpoints
function update (id){
    if  (id != 0){
    var text = prompt ('Update What ? : ')
    switch(text.toUpperCase()){
        case "FIRSTNAME":
            var input = prompt (`ENTER ${text.toUpperCase()} : `)  
           updatedata(id,1,input);
            break
            case "MIDDLENAME":
            var input = prompt (`ENTER ${text.toUpperCase()} : `)
            updatedata(id,2,input);
            break
            case "LASTNAME":
            var input = prompt (`ENTER ${text.toUpperCase()} : `)
            updatedata(id,3,input);
            break
            case "ADDRESS":
            var input = prompt (`ENTER ${text.toUpperCase()} : `)
            updatedata(id,4,input);
            break
            case "GENDER":
            var input = prompt (`ENTER ${text.toUpperCase()} : `)
            updatedata(id,5,input);
            break
            case "BIRTHDATE":
            var input = prompt (`ENTER ${text.toUpperCase()} : `)
            updatedata(id,6,input);
            break
            case "POSITION CODE":
            var input = prompt (`ENTER ${text.toUpperCase()} : `)
            updatedata(id,7,input);
            break
            default:
            alert ("Be specific on your input.\nExample: \n   Firstname,Lastname and etc." );
             break
            }  
        }else {
        console.log ('Please Try Again..')
        }
}










