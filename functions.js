let win_width, dxArr = [], counter = -1, prev = -2;
function createTxtNode(txtInput) {
    let txtEle = document.createTextNode(txtInput);
    return txtEle;
}
function createOptions(optionTxt) {
    let opEle = document.createElement("option");
    let opTxtNode = createTxtNode(optionTxt);
    opEle.appendChild(opTxtNode);
    return opEle;
}
function creatingHeader(stringTxt) {
    let hEle = document.createElement("h2");
    let txtEle = createTxtNode(stringTxt);
    hEle.appendChild(txtEle);
    return hEle;
}
function createChoices(){
    let dEle=document.createElement("div");
    dEle.setAttribute("id","ls");
    let hEle=creatingHeader("Your chosen options are :");
    let br=document.createElement("br");
    let tempS;
    for(let i=0;i<localStorage.length-1;i++)
    {
        let lEle=document.createElement("li");
        tempS="string"+i;
        tempS=localStorage.getItem(tempS);
        let txtEle=createTxtNode(tempS);
        lEle.appendChild(txtEle);
        lEle.appendChild(txtEle);
        hEle.appendChild(lEle);
    }
    
    dEle.appendChild(hEle);
    return dEle;
}
function createSelectBlock(optionList) {
    let divEle = document.createElement("div");
    prev = counter;
    counter = counter + 1;
    divEle.setAttribute("id", counter);
    let labelEle = document.createElement("label");
    labelEle.setAttribute("for",counter+5);
    let txtEle = createTxtNode(Object.keys(optionList)[0]);
    labelEle.appendChild(txtEle);
    let sEle = document.createElement("select");
    sEle.setAttribute("id",counter+5)
    for (let i = 1; i < (Object.keys(optionList).length); i++) {
        optionTxt = Object.keys(optionList)[i];
        opEle = createOptions(optionTxt);
        sEle.appendChild(opEle);
    }
    if (((Object.keys(optionList).length)==1)) {
        hEle1 = creatingHeader("Click here to unravel your study destination!");
        linkEle=document.createElement("a");
        let tempSt=Object.keys(optionList)[length];
        linkEle.href=optionList[tempSt];
        linkEle.setAttribute("id", "ans");
        linkEle.appendChild(hEle1);
        document.body.appendChild(linkEle);
        let fEle = createForm();
        let chEle=createChoices();
        linkEle.after(fEle);
        fEle.after(chEle);
        return;
        /*hEle1 = creatingHeader("Click on the link to unravel your study destination!");
        hEle1.setAttribute("id","res");
        linkEle=document.createElement("a");
        linkEle.href=optionList["Your Final Chosen Answer is : "];
        hEle1.setAttribute("id", "ans");
        linkEle.setAttribute("id", "ans2");
        let tNode=createTxtNode(optionList["Your Final Chosen Answer is : "]);
        linkEle.appendChild(tNode);
        document.body.appendChild(hEle1);
        hEle1.after(linkEle);
        let fEle = createForm();
        let chEle=createChoices();
        linkEle.after(fEle);
        fEle.after(chEle);
        return;*/
    }
    labelEle.appendChild(sEle);
    divEle.appendChild(labelEle);
    document.body.appendChild(divEle);
    sEle.addEventListener("change", () => {
        let tempString="string"+divEle.id;
        localStorage.setItem(tempString,sEle.value);
        if (prev >= divEle.id) {
            if (document.getElementById("formDiv") != null) {
                document.getElementById("formDiv").remove();
            }
            for (let i = parseInt(divEle.id) + 1; i < ((Object.keys(optionList).length)-1); i++) {
                if (document.getElementById(i) != null) {
                    document.getElementById(i).remove();
                    prev = counter;
                    counter = counter - 1;
                }
                if (document.getElementById("ans") != null) {
                    document.getElementById("ans").remove();
                }
                /*if (document.getElementById("ans2") != null) {
                    document.getElementById("ans2").remove();
                }*/
                if (document.getElementById("ls") != null) {
                    document.getElementById("ls").remove();
                }

            }
            counter = counter - 1;
        }

        let newVal = optionList[sEle.value];
        createSelectBlock(newVal);
    });
}
function readingJSONFile() {
    const url = `https://raw.githubusercontent.com/Himanshi-Chetwani/Temp/master/data_Set_two.json`;
    let http = new XMLHttpRequest();
    http.open("GET", url, true);
    http.onreadystatechange = handleHttpResponse;
    function handleHttpResponse() {
        if (http.readyState === 4 && http.status === 200) {
            callback(http.responseText);
        }
    };
    http.send(null);
}
function createSection(inp1) {
    let uEle = document.createElement("ul");
    let lEle = document.createElement("li");
    let labelEle = document.createElement("label");
    labelEle.setAttribute("for", inp1);
    let txtEle = createTxtNode(inp1);
    labelEle.appendChild(txtEle);
    let inpEle = document.createElement("input");
    inpEle.setAttribute("id", inp1);
    if (inp1 == "EmailID") {
        inpEle.setAttribute("type", "email");
        inpEle.setAttribute("pattern", "[A-Za-z0-9._%+-]+@rit.edu");
    }
    /*if(inp1=="Name"){
        inpEle.setAttribute("pattern","^[A-Z][a-z]+\s[A-Z][a-z]+$")
    }*/
    inpEle.setAttribute("placeholder", inp1);
    lEle.appendChild(labelEle);
    lEle.appendChild(inpEle);
    uEle.appendChild(lEle);
    return uEle;

}
function createForm() {
    let divEle = document.createElement("div");
    divEle.setAttribute("id", "formDiv");
    let hEle = creatingHeader("Sending Your Results!");
    let fEle = document.createElement("form");
    fEle.setAttribute("class", "info-form");
    fEle.setAttribute("autocomple", "on");
    let inp1 = "Name";
    let uEle1 = createSection(inp1);
    let bEle = document.createElement("button");
    bEle.setAttribute("type", "submit");
    bEle.setAttribute("name", "submit");
    let ntEle = createTxtNode("Submit Details");
    bEle.appendChild(ntEle);
    fEle.appendChild(uEle1);
    let inp2 = "EmailID";
    let uEle2 = createSection(inp2);
    fEle.appendChild(uEle2);
    fEle.appendChild(bEle);
    hEle.append(fEle);
    divEle.append(hEle);
    return divEle;

}
function dHtml() {

    dimensions();
    for (i = 1; i <= 3; i++) {
        let img = document.createElement('img');
        img.src = "heart.png";
        img.id = "move" + i;
        img.style.fontSize = "14px";
        img.style.position = "absolute";
        img.style.left = 0;
        img.style.top = i * 42 - 42 + "px";
        document.body.appendChild(img);

        moveIt("move" + i, i);

        dxArr[i] = i + 1;
    }
}
function dimensions() {
    win_width = window.innerWidth - 50;
}


function moveIt(whichOne, id) {
    let pos = parseInt(document.getElementById(whichOne).style.left);

    if ((pos < win_width && dxArr[id] > 0) || (pos > 0 && dxArr[id] < 0)) {
        let dx = (dxArr[id] + 1) % 20 + 1 || -1;
        document.getElementById(whichOne).style.left = pos + dx + "px";
    }
    else {
        dxArr[id] = dxArr[id] * -1;
    }

    setTimeout(function () {
        moveIt(whichOne, id);
    }, 20);
}
function createFormBlock(optionsListOne) {
    let fEle = document.createElement("form");
    fEle.setAttribute("class", "firstForm");
    createSelectBlock(optionsListOne);
}
function init() {
    dHtml();
    let retval = readingJSONFile(callback = (response) => {
        actualJSON = JSON.parse(response);
        let hEle = document.createElement("h1");
        let tEle = createTxtNode("Date With Destiny");
        hEle.appendChild(tEle);
        document.body.appendChild(hEle);
        createFormBlock(actualJSON.options);
    });
}



