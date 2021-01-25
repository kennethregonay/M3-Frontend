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
            <td>${employee.id}</td>
            <td>${employee.Firstname}</td>
            <td>${employee.MiddleName}</td>
            <td>${employee.Lastname}</td>
            <td>${employee.Address}</td>
            <td>${employee.Gender}</td>
            <td>${employee.Birthdate}</td>
            <td>${employee.Position_Code}</td>
            <td>
              <a href="index.html?update=${employee.id}" class="btn btn-info" id = "update" onclick="update(${employee.id})">Update </a>
               <a href="employee.html?delete=${employee.id}" class="btn btn-danger" id "delete" onclick="del(${employee.id})">Delete</a>
            </td>
          </tr>`;
          });
            document.getElementById('table-body').innerHTML = output;
}

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
    .then ((res) => console.log(res.json()))
    .then (data =>{
        getdata(data);
        location.reload();
    })
    .catch((error) => {
        console.log(error);
    })
})


//delete the data in the DB using Fetch 
function del (id) {
    fetch (`${api}/${id}`,{
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Accept' : 'application/json',
        } 
    })
    .then (res => res.json())
    .then(() => location.reload())
    .catch((error) => {
         console.log (error);
    })
}
// the content in the Employee Form
function update (id) {
    
}



