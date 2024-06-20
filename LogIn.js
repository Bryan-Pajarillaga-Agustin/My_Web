for(let i = 0; i < listOfUsers.length; i++){
    if(listOfUsers[i].LoggedIn == "true"){
        document.getElementsByClassName("ProfilePicture")[0].style.backgroundImage = "url(ProfilePictures/"+listOfUsers[i].ProfilePicture+")";
        document.querySelector("#signUp").style.display = "none";
        IconProf.style.display = "block"
        LogOut.style.display = "block"
        break;
    }
}