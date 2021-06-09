function deleteConfirm(id) {
    "use strict"; 
    if (confirm('承認するとデータが削除されます。\nよろしいですか？')){
        document.getElementById('delete_'+id).submit();
    }else{
        window.alert('キャンセルしました');
        return false;
    }
}

function indexDeleteConfirm(id) {
    "use strict"; 
    if (confirm('承認するとデータが削除されます。\nよろしいですか？')){
        document.getElementById('delete_'+id).submit();
    }else{
        window.alert('キャンセルしました');
        return false;
    }
}
