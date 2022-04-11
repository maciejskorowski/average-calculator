const numInp = document.getElementById("numInput");
const addBtn = document.getElementById("addButton");
const listMess = document.getElementById("listMessage");
const spanAlert = document.getElementById("spanAlert");
const result = document.getElementById("resultBox");

const numbers = [];
let numberId = 1;

const addNumber = () =>{
    let number = numInp.value;

    spanAlert.innerHTML = "";
    if(!number){
        spanAlert.innerHTML = "field is empty";
        return false;
    }
    if(number.includes(',')){
        number = number.replace(',', '.');
        number = parseFloat(number);
    }
    if(isNaN(number)){
        spanAlert.innerHTML = "value is not a number"
        return false;
    }

    const numberObj = {
        id: numberId++,
        number: number,
    }

    numbers.push(numberObj);
    
    const el = document.createElement('div');
    el.innerHTML = `
        <div class = "list__item">
            <p>${numberObj.number}</p>
            <button class="list__button" onclick="removeNumber(${numberObj.id})">Remove</button>
        </div>
    `;
    el.id = `number${numberObj.id}`;
    console.log(number.length);
    listMess.appendChild(el);
    
    calcAverage();
    numInp.value = "";
} 
const calcAverage =()=>{
    result.innerHTML = "";
    if (numbers.length == 0) {
        return false;
    }

    let suma = 0;
    
    numbers.forEach(el =>{
        suma += parseFloat(el.number);
    })
    let average = suma/numbers.length;
    result.innerHTML = average.toFixed(2);
}
const removeNumber = (id) =>{
    const el = document.getElementById(`number${id}`);
    el.remove();
    const arrayElement = numbers.find(el => el.id === id);
    numbers.splice(numbers.indexOf(arrayElement), 1);
    calcAverage();
}

addBtn.addEventListener('click', addNumber)
numInp.addEventListener('keyup', (event)=>{
    if (event.keyCode == 13) {
        addNumber();
        return true;
        
     } else {
        return false;
    }
});