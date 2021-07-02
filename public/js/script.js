const msg1 = document.querySelector('#msg1');
const msg2 = document.querySelector('#msg2');



document.querySelector('form').addEventListener('submit',(e)=>{
    e.preventDefault();
    msg1.innerText ='loading...';
    msg2.innerText = '';
    let searchValue = document.querySelector('input').value;
    fetch(`/weather?address=${searchValue}`).then((response)=>{
    response.json().then(data=>{
        if(data.error){
            msg1.innerText = data.error;
        }else{
            msg1.innerText = data.location;
            msg2.innerText = data.forecastData;
        }
    })
})
})