// idの指定に変数を利用しないものに利用
function deleteConfirm() {
    "use strict"; 
    if (confirm('承認するとデータが削除されます。\nよろしいですか？')){
        document.getElementById('delete').submit();
    }else{
        window.alert('キャンセルしました');
        return false;
    }
}

// idを変数を利用して区別するものに利用
function indexDeleteConfirm(id) {
    "use strict"; 
    if (confirm('承認するとデータが削除されます。\nよろしいですか？')){
        document.getElementById('delete_'+id).submit();
    }else{
        window.alert('キャンセルしました');
        return false;
    }
}
