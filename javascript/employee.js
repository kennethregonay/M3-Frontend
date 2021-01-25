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

//fill the form in the index.html
const update = (data) => {
    fname.value = data.Firstname;
    lname.value = data.Lastname;
    mname.value =data.MiddleName;
    address.value = data.Address;  
    gender.value = data.Gender;
    bdate.value = data.Birthdate;
    poscode.value = data.Position_Code; 
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
            var input = prompt (`ENTER ${text.toUpperCase} : `)
            fetch (`${api}/${id}`)
            .then((res) => res.json())
            .then(data => update (data ['data'],input, id, 1))
            .catch((error) => {
            console.log(error);
            })
    }
        
    }else {
        console.log ('Di pumasok')
    }
}








