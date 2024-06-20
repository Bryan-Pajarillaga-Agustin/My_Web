let LogOut = document.getElementById("LogOut")
let imgPath
let ProfilePic = document.getElementById("placeholder")
let ProfileDisplay = document.getElementById('display-profile')
ProfilePic.addEventListener('change', upload)
function upload(){
    imgPath = ProfilePic.value.slice(12)
    ProfileDisplay.style.backgroundImage = "url(ProfilePictures/"+imgPath+")";
    console.log(imgPath)
    document.getElementById("ChangeProf").textContent = "Change"
}
let listOfUsers = []
listOfUsers = JSON.parse(localStorage.getItem('ser'))
if(listOfUsers == null){
    listOfUsers = [{
        Username: "Guest",
        Password: "Password",
        ProfilePicture: "NoProf.jpg"
    }]
}


// login form
let pressed = 0;
let userNameTag = document.querySelector("#userNameTag")
let passWordTag = document.querySelector("#passWordTag")
let checkBox = document.querySelector("#pass")
let IconProf = document.getElementsByClassName("ProfilePicture")[0]
passCheck()

function passCheck(){
    
    if(checkBox.checked){
        passWordTag.type = "password"
        password = passWordTag.value
    } else {
        passWordTag.type = "text"
    }   
}
function pressedLogin(){
    for(let i = 0; i < listOfUsers.length; i++){
        listOfUsers[i]['LoggedIn'] = "false"
    }
    for(let i = 0; i < listOfUsers.length ; i++){
        if(userNameTag.value == listOfUsers[i].Username && passWordTag.value == listOfUsers[i].Password){
            alert("Welcome " + listOfUsers[i].Username);
            document.querySelector("#infoPass").innerHTML = ""
            LoggedIn()
            localStorage.setItem('ser', JSON.stringify(listOfUsers))
            break;
        } else {
            if(i + 1 == listOfUsers.length){
                alert("You Entered Invalid username/password")
            }
        }


        if(passWordTag.value == "" && pressed == 1){
            document.querySelector("#infoPass").innerHTML = "! Put your password first" + "<br>"
        } else {
            document.querySelector("#infoPass").innerHTML = ""
        }
    
        if(userNameTag.value == "" && pressed == 1){
            document.querySelector("#infoUser").innerHTML = "! Put your username first" + "<br>"
        } else {
            document.querySelector("#infoUser").innerHTML = ""
        }
        if(passWordTag.value == ""){
            document.querySelector("#infoPass").innerHTML = "! Put your password first" + "<br>"
        } else if(passWordTag.value != listOfUsers[i].Password){
                document.querySelector("#infoPass").innerHTML = "! Wrong password" + "<br>"
        }
        if(userNameTag.value == ""){
            document.querySelector("#infoUser").innerHTML = "! Put your username first" + "<br>"
        } 
    }
}
function LoggedIn(){
    for(let i = 0; i < listOfUsers.length ; i++){
        if(userNameTag.value == listOfUsers[i].Username && passWordTag.value == listOfUsers[i].Password){
            listOfUsers[i]['LoggedIn'] = "true"
            document.getElementsByClassName("ProfilePicture")[0].style.backgroundImage = "url(ProfilePictures/"+listOfUsers[i].ProfilePicture+")";
            document.querySelector("#signUp").style.display = "none";
            IconProf.style.display = "block"
            LogOut.style.display = "block"
        }
    }
}
// Sign in form
let signUpBox = document.querySelector(".SignUpBox")
let createUser = document.querySelector("#NewUser")
let createPass = document.querySelector("#createPass")
let verifyPass = document.querySelector("#verifyPass")
let exitButt = document.querySelector("#exit")
let createAccButt = document.querySelector("#createAcc")
let SetProfileBox = document.querySelector(".account-making")

let NewUserPass;
let NewUserName;

let newUser;
function exit(){

    imgPath = ProfilePic.value
    ProfileDisplay.style.backgroundImage = "url("+imgPath+")";
    

    if(signUpBox.classList.contains("showSignbox") || SetProfileBox.classList.contains("showSignbox")){
        signUpBox.classList.replace("showSignbox", "hideSignbox")
        SetProfileBox.classList.replace("showSignbox", "hideSignbox")
        createUser.value = ""
        createPass.value = ""
        verifyPass.value = ""
        
        for(let i = 0; i < 3; i++){
            document.getElementsByClassName("alert")[i].textContent = ""
        }

        setTimeout(() => {
            createUser.style.display = "none"
            createPass.style.display = "none"
            verifyPass.style.display = "none"
            createAccButt.style.display = "none"
        }, 500);
    }
}
function signUp(){
    signUpBox.style.display = 'flex'
    if(signUpBox.classList.contains("hideSignbox")){
        signUpBox.classList.replace("hideSignbox", "showSignbox")
        createUser.style.display = "block"
        createPass.style.display = "block"
        verifyPass.style.display = "block"
        exitButt.style.display = "block"
        createAccButt.style.display = "block"
    }
}
function createAcc(){
    NewUserName = createUser.value
    NewUserPass = createPass.value
    if((createUser.value != "")&&(createPass.value != "")&&
    (verifyPass.value != "" && verifyPass.value == createPass.value)&&
    (((NewUserName.length <= 7)==false))&&
    ((NewUserPass.length <= 7)==false)){
        
        for(let i = 0; i < listOfUsers.length ; i++){

            if(createUser.value == listOfUsers[i].Username && createPass.value == listOfUsers[i].Password){
                document.querySelector("#NoInputs").textContent = "The Username is already existed!"
                break;
            } else if(i + 1 >= listOfUsers.length && ((userNameTag.value == listOfUsers[i].Username && passWordTag.value == listOfUsers[i].Password) == false)){
                document.getElementsByClassName('account-making')[0].style.display = "block"
                if(SetProfileBox.classList.contains("hideSignbox")){
                    SetProfileBox.classList.replace("hideSignBox", "showSignbox")
                }
                break;
            }
        } 
        
    }

    if(NewUserName.length <= 7){
        document.querySelector("#NoInputs").textContent = "The given Username is too short!"
    }
    if(NewUserPass.length <= 7){
        document.querySelector("#NoInputs2").textContent = "The given Password is too short!"
    }
    if(createUser.value == ""){
        document.querySelector("#NoInputs").textContent = "Put your Username first!"
    }
    if(createPass.value == ""){
        document.querySelector("#NoInputs2").textContent = "Put your Password first!"
    }
    if(verifyPass.value != createPass.value){
        document.querySelector("#NoInputs3").textContent = "The Password doesn't match!"
    } else{
        document.querySelector("#NoInputs3").textContent = " "
    }
}
function proceed(){

    
    newUser = {
        Username: createUser.value,
        Password: createPass.value,
        ProfilePicture: imgPath
    }
    alert("You Have Successfully Get An Account")
    listOfUsers.unshift(newUser)
    localStorage.setItem('ser', JSON.stringify(listOfUsers))
    let parse = JSON.parse(localStorage.getItem('ser'))
    listOfUsers = parse
    
    
    setTimeout(() => {
        SetProfileBox.style.display = "none"
    }, 500);
    document.getElementById("ChangeProf").textContent = "Choose Profile Picture"
    exit()
}
function logOut(){
    document.querySelector("#signUp").style.display = "block";
    IconProf.style.display = "none"
    LogOut.style.display = "none"
    for(let i = 0; i < listOfUsers.length; i++){
        listOfUsers[i].LoggedIn = "false"
    }

    localStorage.setItem('ser', JSON.stringify(listOfUsers))

}

