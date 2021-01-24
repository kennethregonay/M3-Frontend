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
              <a href="update.php?update=" class="btn btn-info">Update </a>\
               <a href="employee.php?delete=" class="btn btn-danger">Delete</a>\
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

// Add a new Record
add.addEventListener('submit',(e) => {
    e.preventDefault();
    fetch (api,{
        method: 'POST',
        Headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            Firstname  : fname.value,
            Lastname   : lname.value,
            MiddleName : mname.value,
            Address : address.value,
            Gender : gender.value,
            Birthdate : bdate.value,
        })
    })
    .then (res => res.json())
    .then ((data => {
        const arr = [];
        arr.push(data);
        getdata(arr);
        console.log ('Record Successfully Added.');
    }))
    
})



