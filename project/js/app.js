const from = document.getElementById("from")
const to = document.getElementById("to")
const input=document.getElementById("input")
const result=document.getElementById("result")
const historyList=document.getElementById("historyList")
const del=document.getElementById("del")

function createOption (x,y,z){
    let o = document.createElement("option");
    let t =document.createTextNode(y);
    o.setAttribute("value",toNumber(z))
    o.appendChild(t);
    x.appendChild(o);
}

function toNumber(x){
    return Number(x.replace(",",""));
}

for (x in data.rates){
    createOption(from,x,data.rates[x])
    createOption(to,x,data.rates[x])
    // console.log(x,data.rates[x])
}

function createTr(x){
    let tr=document.createElement("tr");
    let rowSpacer=document.getElementById("rowSpacer");
    if(rowSpacer){
        rowSpacer.remove();
    }

    x.map(function(el){
        let td=document.createElement("td")
        let text=document.createTextNode(el)
        td.appendChild(text)
        tr.appendChild(td)
    })
    historyList.appendChild(tr)
};

function delBtn(){
    let delBtn=document.createElement('button');
    let delBtntext=document.createTextNode('Delete All');

    delBtn.setAttribute("id","deleteBtn")
    delBtn.setAttribute("onclick","deleteAll()")
    delBtn.appendChild(delBtntext)
    del.appendChild(delBtn)

   
};

function deleteAll(){
    localStorage.clear();
    if(localStorage.getItem("record")){
        
        historyList.innerHTML=localStorage.getItem("record");
        
    }else{
        historyList.innerHTML=`<tr id="rowSpacer"> <td colspan="4">There is no record</td> </tr>`;
    };
    del.remove();
    
}


function store(){
    localStorage.setItem("record",historyList.innerHTML);
};


document.getElementById("calc").addEventListener("submit",(e)=>{
    e.preventDefault();

    //get value
    let x= input.value;
    let y= from.value;
    let z= to.value;
    console.log(x,y,z);

    //calculation
    

    let first = x*y;
    let second = first/z;
    let resultText=second.toFixed(2);
    let showresult=resultText+" "+to.options[to.selectedIndex].innerHTML;
    let fromText=x+" "+from.options[from.selectedIndex].innerHTML;
    let toText=to.options[to.selectedIndex].innerHTML;
    let date=new Date().toLocaleString();
    let arr=[date,fromText,toText,showresult]

    createTr(arr)
    store()

    //result
    result.innerHTML=resultText;
    input.value="";
    from.value="";
    to.value="1";
    input.focus()

    // delete 
    

});

(function(){
    if(localStorage.getItem("record")){
        historyList.innerHTML=localStorage.getItem("record");
        delBtn();
        
    }else{
        historyList.innerHTML=`<tr id="rowSpacer"> <td colspan="4">There is no record</td> </tr>`;
    };
})();

function changeMode(){
    document.body.classList.toggle("night-mode");
    document.getElementById("modeIcon").classList.toggle("fa-sun")
};






