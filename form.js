var list=document.getElementById('list-items');
list.addEventListener('click' ,removeElement);
var anonymousId;
window.addEventListener("DOMContentLoaded",()=>{
    axios.get('http://localhost:5000/get-user')
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

        if(anonymousId == undefined){
            axios.post('http://localhost:5000/insert-user',myObj)
           .then((res)=> console.log(res))
           .catch((err)=> console.log(err)); 
        }
        else{
            axios.put(`https://crudcrud.com/api/5aef32cd25fa40e890f39e99a1c808a1/appointments/${anonymousId}`,myObj)
            .then((res)=> console.log(res))
            .catch((err)=> console.log(err)); 
        }
    

    // var myObjSerial=JSON.stringify(myObj);
    // localStorage.setItem(email_,myObjSerial);
    
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
            axios
            .delete(`http://localhost:5000/delete-user/${email_}`)
            .then(res=>console.log(res))
            .catch(err=>console.log(err))
            list.removeChild(li);
        }
    }

    else if(e.target.classList.contains('edit')){
        var li=e.target.parentElement;
        const arr=li.textContent.split(" - " );
        var email_=arr[1];
        axios.get('https://crudcrud.com/api/5aef32cd25fa40e890f39e99a1c808a1/appointments',{
            params:{email:email_}
        })
        .then(
            (res)=>{
                console.log(res);
                for(var i=0;i<res.data.length;i++){
                    if(res.data[i].email==email_){
                        document.getElementById('id1').value=res.data[i].name
                    document.getElementById('id2').value=res.data[i].email
                    document.getElementById('id3').value=res.data[i].phone
                    anonymousId=res.data[i]._id;
                    }
                }        
                    
            }
        )    
        .catch(
            (err)=>console.log(err)
            
        )
        // localStorage.removeItem(email);
       
        list.removeChild(li);
    }
}

