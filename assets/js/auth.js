$(document).ready(function(){
    authentication();
})
var host = window.location.hostname;
function authentication (){
    var checkusername = sessionStorage.getItem("username");

    if(checkusername == null){
        window.location.href = ""+protocal+"//"+host+"/leave_management/index.html";
    }


}