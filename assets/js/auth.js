$(document).ready(function(){
    authentication();
})
var host = window.location.hostname;
function authentication (){
    var checkusername = sessionStorage.getItem("username");

    if(checkusername == null){
        window.location.href = "http://"+host+"/leave_management/login.html";
    }


}