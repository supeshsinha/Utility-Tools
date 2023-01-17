const buttons = document.querySelectorAll(".buttons");
const display = document.querySelector(".row1 p");

let prev = 0;
let prev_sign = "0";
console.log("connected");
function clear(){
    display.innerText="0";
    prev =0;
    prev_sign = "0";
}

function calculate(a,sign,b){
    if(sign == "+"){
        return a+b;
    }
    else if(sign == "-"){
        return a-b;
    }
    else if(sign == "X"){
        return a*b;
    }
    else if(sign == "÷"){
        return a/b;
    }
    
}

for(let i=0; i<buttons.length; i++){
    buttons[i].addEventListener("click",function(event){
        let text = event.target.innerText;
        console.log(text);
        console.log("hi");
        if(text == "C"){
            clear();
        }
        else if(text == "⌫"){
            if(display.innerText != "0"){
                display.innerText = display.innerText.substr(0,display.innerText.length-1);
            }
        }
        else if(text == "="){
                if(prev_sign != "0"){
                    prev = calculate(prev,prev_sign,parseFloat(display.innerText));
                    display.innerText = prev;
                }
                prev =0;
                prev_sign = "0";
        }
        else if(isNaN(text)){
            if(prev_sign == "0"){
                prev = parseFloat(display.innerText);
            }
            else{
                prev = calculate(prev,prev_sign,parseFloat(display.innerText));
            }
            prev_sign = text;
            display.innerText = "0";
            
        }
        else{
            if(display.innerText=="0"){
                display.innerText= text;
            }
            else{
                display.innerText += text;
            }
        }
        
    });
}