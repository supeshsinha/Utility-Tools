const game = document.querySelector(".game");
const boxes = document.querySelectorAll(".game>div");


function isLetter(letter) {
    return /^[a-zA-Z]$/.test(letter);
  }

let rightword = " ";
let verdict = false;
async function retrieve(){
    let response = await fetch("https://words.dev-apis.com/word-of-the-day");
    let object = await response.json(); 
    rightword = object.word;
}
async function validate(){
    let word = "";
    let k = i;
        do{
            word = boxes[k-1].innerText + word;
            k--;
        }
        while(k%5 > 0);
    const response1 = await fetch("https://words.dev-apis.com/validate-word",{
        method : "POST",
        body : JSON.stringify({
            word: `${word}`
        })
    })
    const object1 = await response1.json();
    if(object1.validWord) verdict = true;
    else verdict = false;
}

retrieve();

let i = 1;
document.addEventListener("keydown",async function keyevent(event){
    if(event.key == "Backspace"){
        boxes[i-1].innerText = "";
        if(i%5 !== 1) i--;
    }
    else if(i%5 === 0 && event.key == "Enter" && boxes[i-1].innerText !== ""){
        await validate();
        if(verdict){

        

        const temp = [];
        for(let k=0;k<5;k++){
            temp.push(0);
        }

        const temp1 = [];
        for(let k=0;k<30;k++){
            temp1.push(0);
        }
        let cnt =0;

        let j = i;
        do{
            if(rightword[(j-1)%5] == boxes[j-1].innerText.toLowerCase()){
                boxes[j-1].style.backgroundColor = "green";
                cnt++;
                temp[(j-1)%5] = 1;
                temp1[j-1] = 1;
            }

            j--;
        }
        while(j%5 > 0);

        if(cnt===5){
            document.removeEventListener("keydown",keyevent);
            alert("Wow You won!");
            const won =1;
        }

        j = i;
        do{
            if(!rightword.includes(boxes[j-1].innerText.toLowerCase())){
                boxes[j-1].style.backgroundColor = "grey";
                temp1[j-1] = 1;
            }

            j--;
        }
        while(j%5 > 0);

        j = i;
        console.log(temp1);
        do{
            if(temp1[j-1] == 0){
                for(let l=0;l<5;l++){
                    if(temp[l] === 0){
                        if(rightword[l] == boxes[j-1].innerText.toLowerCase()){
                            boxes[j-1].style.backgroundColor = "gold";
                            temp1[j-1] = 1;
                            temp[l] = 1;
                            break;
                        }
                    }
                }
                if(temp1[j-1] == 0){
                    boxes[j-1].style.backgroundColor = "grey";
                }
            }
            j--;
        }
        while(j%5 > 0);
        

        if(i < 30) i++;
        else if(won){

        }
        else{
            alert("Game Over");
            document.removeEventListener("keydown",keyevent);
        }
    }
        else{//If word is not valid

            let m = i;
        do{
            boxes[m-1].style.borderColor = "red";
            m--;
        }
        while(m%5 > 0);

        setTimeout(function(){
            m = i;
            do{
                boxes[m-1].style.borderColor = "black";
                m--;
            }
            while(m%5 > 0);
        }, 2000)

        }
    }
    else if(isLetter(event.key)){

        boxes[i-1].innerText = event.key;

        if(i%5 !== 0) i++;
        
        
    }
    else{
        console.log("Invalid Key");
    }


});