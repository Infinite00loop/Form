function onsignup(){
    // localStorage.setItem('Name' ,document.getElementById('id1').value );
    // localStorage.setItem('Email' ,document.getElementById('id2').value );
    // localStorage.setItem('Phone' ,document.getElementById('id3').value );
    // localStorage.setItem('Date' ,document.getElementById('id4').value );
    // localStorage.setItem('Time' ,document.getElementById('id5').value );
    // console.log(localStorage.getItem('Name'));
    // console.log(localStorage.getItem('Email'));
    // console.log(localStorage.getItem('Phone'));
    // console.log(localStorage.getItem('Date'));
    // console.log(localStorage.getItem('Time'));

     }
     let myObj={
        name:'Sam',
        age:'20'
     }
     let myObjSerialized=JSON.stringify(myObj);
     localStorage.setItem('myObj' ,myObjSerialized);
     console.log(localStorage.getItem('myObj'));
     let myObjDeserialized=JSON.parse(localStorage.getItem('myObj'));
     console.log(myObjDeserialized);
