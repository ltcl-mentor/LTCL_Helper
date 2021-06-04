function deleteConfirm() {
    "use strict"; 
    if (confirm('承認するとデータが削除されます。\nよろしいですか？')){
        document.getElementById('delete').submit();
    }else{
        window.alert('キャンセルしました');
        return false;
    }
}
