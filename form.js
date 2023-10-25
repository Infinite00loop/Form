var list=document.getElementById('list-items');
list.addEventListener('click' ,removeElement);
window.addEventListener("DOMContentLoaded",()=>{
    axios.get('https://crudcrud.com/api/0a3d0f6876dc4abaa5721543c25c5d21/appointments')
    .then((res)=> {
        console.log(res)

        for(var i=0; i<res.data.length;i++){
            showData(res.data[i])
        }
    })
    .catch((err) =>{
        console.log(err)
    })
})
function onsignup(){
    var name_=document.getElementById('id1').value;
    var email_=document.getElementById('id2').value;
    var phone_=document.getElementById('id3').value;

    let myObj={
        name: name_,
        email: email_,
        phone: phone_
    };

    // var myObjSerial=JSON.stringify(myObj);
    // localStorage.setItem(email_,myObjSerial);
    axios.post('https://crudcrud.com/api/0a3d0f6876dc4abaa5721543c25c5d21/appointments',myObj)
    .then((res)=> console.log(res))
    .catch((err)=> console.log(err)); 

    showData(myObj);

}

function showData(obj){
    var newList=document.createElement('li');
    var text=obj.name+" - "+obj.email+" - "+obj.phone+" - ";
    newList.appendChild(document.createTextNode(text));
    var delButton=document.createElement('button');
    delButton.className='delete';
     delButton.appendChild(document.createTextNode('Delete'));
    newList.appendChild(delButton);
    var EditButton=document.createElement('button');
    EditButton.className='edit';
     EditButton.appendChild(document.createTextNode('Edit'));
    newList.appendChild(EditButton);

    list.appendChild(newList);

}

function removeElement(e){
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure to delete ?')){
            var li=e.target.parentElement;
           
            var email_=li.textContent.split(" - ")[1];
            console.log(email_)
            // localStorage.removeItem(email);
            axios.get('https://crudcrud.com/api/0a3d0f6876dc4abaa5721543c25c5d21/appointments',{
                params:{email:email_}
            })
            .then(
                (res)=>{
                    console.log(res);
                    for(var i=0;i<res.data.length;i++){
                        if(res.data[i].email==email_)
                        axios
                        .delete(`https://crudcrud.com/api/0a3d0f6876dc4abaa5721543c25c5d21/appointments/${res.data[i]._id}`)
                        .then(res=>console.log(res))
                        .catch(err=>console.log(err))
                    }
                }
            )
            .catch(
                (err)=>console.log(err)
                
            )
            list.removeChild(li);
        }
    }
}
//     else if(e.target.classList.contains('edit')){
//         var li=e.target.parentElement;
//         const arr=li.textContent.split(" - " );
//         var email=arr[1];
//         localStorage.removeItem(email);
//         document.getElementById('id1').value=arr[0];
//         document.getElementById('id2').value=arr[1];
//         document.getElementById('id3').value=arr[3];
//         list.removeChild(li);
//     }
// }
