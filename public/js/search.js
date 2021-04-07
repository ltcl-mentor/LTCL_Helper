    
document.getElementById("curriculumBox").style.display="none";
document.getElementById("portfolioBox").style.display="none";

document.getElementById("changeCategory").style.display="none";
document.getElementById("changeTopic").style.display="none";

document.getElementById("AWS").style.display="none";
document.getElementById("HTML").style.display="none";
document.getElementById("CSS").style.display="none";
document.getElementById("JavaScript").style.display="none";
document.getElementById("PHP").style.display="none";
document.getElementById("Laravel").style.display="none";
document.getElementById("DB").style.display="none";
document.getElementById("Git&GitHub").style.display="none";
document.getElementById("environment").style.display="none";
document.getElementById("blueprint").style.display="none";
document.getElementById("deploy").style.display="none";
document.getElementById("API").style.display="none";

function selectCategory(){
    document.getElementById("firstSelect").style.display="";
    var radio=document.getElementsByName("category");
    if(radio[0].checked){
        document.getElementById("curriculumBox").style.display="";
        var result="カリキュラム";
    }else if(radio[1].checked){
        document.getElementById("portfolioBox").style.display="";
        var result="成果物";
    }
    document.getElementById("firstSelect").innerHTML=result;
    document.getElementById("changeCategory").style.display="";
    document.getElementById("categoryBox").style.display="none";
}

function changeCategory(){
    document.getElementById("curriculumBox").style.display="none";
    document.getElementById("portfolioBox").style.display="none";
    document.getElementById("changeCategory").style.display="none";
    document.getElementById("firstSelect").style.display="none";
    document.getElementById("secondSelect").style.display="none";
    document.getElementById("changeTopic").style.display="none";
    document.getElementById("AWS").style.display="none";
    document.getElementById("HTML").style.display="none";
    document.getElementById("CSS").style.display="none";
    document.getElementById("JavaScript").style.display="none";
    document.getElementById("PHP").style.display="none";
    document.getElementById("Laravel").style.display="none";
    document.getElementById("DB").style.display="none";
    document.getElementById("Git&GitHub").style.display="none";
    document.getElementById("environment").style.display="none";
    document.getElementById("blueprint").style.display="none";
    document.getElementById("deploy").style.display="none";
    document.getElementById("API").style.display="none";
    document.getElementById("categoryBox").style.display="";
}

function selectCurriculum(){
    document.getElementById("secondSelect").innerHTML="";
    document.getElementById("resultBox").style.display="";
    document.getElementById("secondSelect").style.display="";
    var radio=document.getElementsByName("curriculum");
    if(radio[0].checked){
        document.getElementById("AWS").style.display="";
        document.getElementById("curriculumBox").style.display="none";
        var result="AWS";
    }else if(radio[1].checked){
        document.getElementById("HTML").style.display="";
        document.getElementById("curriculumBox").style.display="none";
        var result="HTML";
    }else if(radio[2].checked){
        document.getElementById("CSS").style.display="";
        document.getElementById("curriculumBox").style.display="none";
        var result="CSS";
    }else if(radio[3].checked){
        document.getElementById("JavaScript").style.display="";
        document.getElementById("curriculumBox").style.display="none";
        var result="JavaScript";
    }else if(radio[4].checked){
        document.getElementById("PHP").style.display="";
        document.getElementById("curriculumBox").style.display="none";
        var result="PHP";
    }else if(radio[5].checked){
        document.getElementById("Laravel").style.display="";
        document.getElementById("curriculumBox").style.display="none";
        var result="Laravel";
    }else if(radio[6].checked){
        document.getElementById("DB").style.display="";
        document.getElementById("curriculumBox").style.display="none";
        var result="DB";
    }else if(radio[7].checked){
        document.getElementById("Git&GitHub").style.display="";
        document.getElementById("curriculumBox").style.display="none";
        var result="Git&GitHub";
    }
    document.getElementById("changeTopic").style.display="";
    document.getElementById("secondSelect").innerHTML=result;
    window.scrollBy(0,300);
}

function selectPortfolio(){
    document.getElementById("resultBox").style.display="";
    document.getElementById("secondSelect").style.display="";
    var radio=document.getElementsByName("portfolio");
    if(radio[0].checked){
        document.getElementById("environment").style.display="";
        document.getElementById("portfolioBox").style.display="none";
        var result="環境構築";
    }else if(radio[1].checked){
        document.getElementById("blueprint").style.display="";
        document.getElementById("portfolioBox").style.display="none";
        var result="設計図";
    }else if(radio[2].checked){
        document.getElementById("deproy").style.display="";
        document.getElementById("portfolioBox").style.display="none";
        var result="デプロイ";
    }else if(radio[3].checked){
        document.getElementById("API").style.display="";
        document.getElementById("portfolioBox").style.display="none";
        var result="API";
    }
    document.getElementById("changeTopic").style.display="";
    document.getElementById("secondSelect").innerHTML=result;
    window.scrollBy(0,300);
}

function changeTopic(){
    document.getElementById("resultBox").style.display="none";
    document.getElementById("changeTopic").style.display="none";
    document.getElementById("secondSelect").style.display="none";
    var category=document.getElementsByName("category");
    if(category[0].checked){
        document.getElementById("curriculumBox").style.display="";
        var curriculum=document.getElementsByName("curriculum");
        if(curriculum[0].checked){
            document.getElementById("AWS").style.display="none";
        }else if(curriculum[1].checked){
            document.getElementById("HTML").style.display="none";
        }else if(curriculum[2].checked){
            document.getElementById("CSS").style.display="none";
        }else if(curriculum[3].checked){
            document.getElementById("JavaScript").style.display="none";
        }else if(curriculum[4].checked){
            document.getElementById("PHP").style.display="none";
        }else if(curriculum[5].checked){
            document.getElementById("Laravel").style.display="none";
        }else if(curriculum[6].checked){
            document.getElementById("DB").style.display="none";
        }else if(curriculum[7].checked){
            document.getElementById("Git&GitHub").style.display="none";
        }
    }else if(category[1].checked){
        document.getElementById("portfolioBox").style.display="";
        var portfolio=document.getElementsByName("portfolio");
        if(portfolio[0].checked){
            document.getElementById("environment").style.display="none";
        }else if(portfolio[1].checked){
            document.getElementById("blueprint").style.display="none";
        }else if(portfolio[2].checked){
            document.getElementById("deproy").style.display="none";
        }else if(portfolio[3].checked){
            document.getElementById("API").style.display="none";
        }
    }
}