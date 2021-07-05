var set = 0;

function doubleClickStopper() {
    if(set==0){
        set=1;
        document.getElementById('create').submit();
    }else{
        return false;
    }
}
