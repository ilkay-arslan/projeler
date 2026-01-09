var result=document.querySelector(".result");

const ac=document.querySelector(".AC");
const de=document.querySelector(".DE");

const point=document.querySelector(".point");
const division=document.querySelector(".division");
const multi=document.querySelector(".multi");
const sub=document.querySelector(".sub");
const plus=document.querySelector(".plus");
const equals=document.querySelector(".equals");


const one=document.querySelector(".one");
const two=document.querySelector(".two");
const three=document.querySelector(".three");
const four=document.querySelector(".four");
const five=document.querySelector(".five");
const six=document.querySelector(".six");
const seven=document.querySelector(".seven");
const eight=document.querySelector(".eight");
const nine=document.querySelector(".nine");
const zero=document.querySelector(".zero");
const dbl_zero=document.querySelector(".dbl_zero");


const keyButtonMap={

    '0':zero,
    '1':one,
    '2':two,
    '3':three,
    '4':four,    
    '5':five,
    '6':six,
    '7':seven,   
    '8':eight,
    '9':nine,
    '+':plus,
    '-':sub,
    '*':multi,
    '/':division,
    '.':point,
    'Enter':equals,
}

addEventListener("keydown",function(e){
    console.log(e);
    if(result.innerText==="Hata"){
        result.innerText="";
    }
    if(e.key==='Backspace'){
        e.preventDefault();
        removeLastChar();
    }
    else if(e.key==='Enter'){
        e.preventDefault();
        evaulateResult();
    }
    else if(keyButtonMap.hasOwnProperty(e.key)){
        e.preventDefault();
        keyButtonMap[e.key].click();
    }

})

equals.addEventListener("click",evaulateResult);

document.querySelectorAll('.btn').forEach(button=>{
    button.addEventListener('click',(e)=>{
    let lastChar= result.innerText.slice(-1);
    let value=e.target.textContent;

    if(result.innerText==="Hata"){
        result.innerText="";
    }
    else if(['+','-','*','/','.',' '].includes(value) && ['+','-','*','/','.',' '].includes(lastChar)){}
    else if(value==="="){
        evaulateResult();
    }
    else if(value==="AC"){
        result.innerText="";
    }
    else if(value==="DE"){
        removeLastChar();
    }
    else{
        result.innerText+=value;
    }
    })
})

function removeLastChar(){
    result.innerText=result.innerText.slice(0,-1);
}

function evaulateResult(){
    let operation=result.innerText.replace(/,/g,'.');

    try{
        const resultValue=new Function('return ' + operation)();
        result.innerText=resultValue.toString().replace(/\./g,',');
    }
    catch(e){
        result.innerText='Hata';
        console.error('Hatalı işlem:',e);
    }

}

