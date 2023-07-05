$(function(){
    getDate()
    getTime()
    displayMenu()
    changeScreenFromBtn()
    changeScreenInHome()
    changeScreenFromMenuBar()
    callingScreen()
    ToDoList()
    quiz()
    quizStart()
    quizFinish()
    calculate()
})
let today = new Date();
let dateInterval = setInterval(getTime,1000)
function getDate(){                         //날짜표시
    let year = today.getFullYear();
    let month = today.getMonth() +1;
    let date = today.getDate();
    var weekday = new Array(7);
        weekday[0] = "일요일";
        weekday[1] = "월요일";
        weekday[2] = "화요일";
        weekday[3] = "수요일";
        weekday[4] = "목요일";
        weekday[5] = "금요일";
        weekday[6] = "토요일";
    let day = weekday[today.getDay()]
    let dateOnScreen = year + "." + month + "." + date + "<br> " + day
    $("#date").html(dateOnScreen);
}

let timeInterval = setInterval(getTime,1000)
function getTime(){                         //시간표시
    today = new Date();
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    let timeOnScreen = hours + ":" + minutes
    console.log(timeOnScreen);
    $("#time").text(timeOnScreen);
}

function displayMenu(){
    $("#menuList").hide();
    $("#topMenu").click(function(){     // 상단메뉴 클릭시 슬라이드 업 다운
        $("#menuList").slideToggle();
    })
}
function changeScreenFromBtn(){
    $("#bottom_btn").click(toHome);
}
function changeScreenInHome(){          //어플 클릭시 화면전환
    $("#call").click(toCall);           // 전화화면
    $("#toDoList").click(toToDoList); // ToDoList 화면 띄우기
    $("#quiz").click(toQuiz);           // 퀴즈 화면 띄우기
    $("#calculator").click(toCalc);     //계산기 화면 띄우기

}
function changeScreenFromMenuBar(){     //상단 메뉴에서 클릭시 화면전환
    $("#tohome").click(toHome)      //홈화면으로
    $("#toCall").click(toCall)      //전화 화면으로
    $("#toToDoList").click(toToDoList)   //ToDoList 화면으로
    $("#toQuiz").click(toQuiz)      // 퀴즈 화면으로
    $("#toCalc").click(toCalc)      //계산기 화면으로
}

function callScreen(){
    var number = "";
    var click;
    var count = 0;
    var stick = "-";
    $(".callKeyPads").click(function(){
        var thisBtn = $(this);
        $(this).css('background-color','rgb(68, 68, 68)');      //클릭시 색변환
        setTimeout(function(){
            thisBtn.css('background-color',' rgb(209, 209, 209)'); //색 원래대로
        },250);
        
        if(finishCall==true){ //통화종료 후 돌아오면 초기화
            count = 0;
            number = "";
        }
        click = $(this).text();
        finishCall = false;
        number += click;            // 클릭된 번호 추가
        count++         
        if(count==3){               // 전화번호사이 - 추가
            number += stick;
        } else if(count==7){
            number += stick;
        }
        $("#display_number").text(number);      //출력
    })
    $("#deleteNum_btn").click(function(){       // 하나씩 지우기
        var a = number.length
        if (number.charAt(a - 1) === '-') {     //  마지막 글자가 -면 2개 지움
            number = number.slice(0, -2);
            count --
          } else if(number.length==0){          //지울게 없으면 리턴
            return          
          } else {
            number = number.slice(0, -1);
            count--;
          }
          $("#display_number").text(number);      //출력
    })
    document.addEventListener('keydown', function (event){ //키패드 입력을 통한 출력
        var keypadClick = event.key;
        if(keypadClick >= '0' && keypadClick <= '9' && event.code.startsWith('Numpad') ||
        keypadClick >= '0' && keypadClick <= '9' && event.code.startsWith('Digit')) {
            if(finishCall==true){ //통화종료 후 돌아오면 초기화
                count = 0;
                number = "";
            }
            finishCall = false;
            number += keypadClick;
            count++
            if(count==3){
                number += stick;
            } else if(count==7){
                number += stick;
            }
            $("#display_number").text(number);
        }
        // if (event.key === 'Enter' || event.code === 'NumpadEnter') {    // enter -> 전화걸기
        //     var enteredNumber = $("#display_number").text();         // 계산기랑 겹침
        //     $("#call_screen").hide();
        //     $("#calling_screen").show();
        //     $("#enteredNumber").text(enteredNumber)
        // }
    })
}
var finishCall = false;
function callingScreen(){
    $("#call_btn").click(function(){                    //전화걸기
        var enteredNumber = $("#display_number").text();
        $("#call_screen").hide();
        $("#calling_screen").show();
        $("#enteredNumber").text(enteredNumber)
    })
    $("#finishCall_btn").click(function(){              //전화끊기
        $("#call_screen").show();
        $("#calling_screen").hide();
        $("#display_number").text("")
        finishCall = true; //통화종료시 초기화를 위한 변수
    })
    $('.callOptions').click(function() {                // 통화중 옵션 css
        var $this = $(this);
        if ($this.css('background-color') === 'rgb(128, 128, 128)') {
          $this.css('background-color', 'white');
          $this.css('opacity', '0.4');
        } else {
          $this.css('background-color', 'grey');
          $this.css('opacity', '0.8');
        }
      });
    
    //   document.addEventListener('keydown', function (event){ //키패드 입력을 통한 출력
    //     var keypadClick = event.key;                     // 계산기랑 중복됨 ㅠ
    //     if (event.key === 'Escape') {                           //esc -> 모두지우기
    //         $("#call_screen").show();
    //         $("#calling_screen").hide();
    //         $("#display_number").text("")
    //         finishCall = true; //통화종료시 초기화를 위한 변수
    //     }
    // })
}

let list_list = document.getElementById('list_list');
function ToDoList(){
    
    $("#addToDoThing").click(function(){        // 할일 추가
        addToDoThing()
    })
    document.addEventListener('keydown', function (event){ //키패드 입력을 통한 출력
        if (event.key === 'Enter' || event.code === 'NumpadEnter') {    // enter -> 할일추가
            addToDoThing()
        }
    })

    $("#allDelete").click(function(){       //전체삭제
        $("#list_list").text("");
    })

    $("#selectDelete").click(function(){    //선택삭제
        var checkCount = document.getElementsByClassName('toDoList_checkBox');
        for(var i=0; i<checkCount.length; i++) {
            if(checkCount[i].checked===true){
                $(".toDoListThing").eq(i).remove();
                i--
            }
        }
    })

    $("#selectFinish").click(function(){    //선택 수행완료
        var checkCount = document.getElementsByClassName('toDoList_checkBox');
        for(var i=0; i<checkCount.length; i++) {
            if(checkCount[i].checked===true){
                $(".toDoList_text").eq(i).css('text-decoration','line-through');
            }
        }
        $(".toDoList_checkBox").prop("checked",false);
    })

    $("#selectReset").click(function(){    //선택 수행취소
        var checkCount = document.getElementsByClassName('toDoList_checkBox');
        for(var i=0; i<checkCount.length; i++) {
            if(checkCount[i].checked===true){
                $(".toDoList_text").eq(i).css('text-decoration','none');
            }
        }
        $(".toDoList_checkBox").prop("checked",false);
    })
}

function addToDoThing(){
        var toDoThing = $("#toDoThing").val();
        var newToDoThing = document.createElement('div');
        newToDoThing.setAttribute('class','toDoListThing')
        var newCheck = document.createElement('div');
        newCheck.setAttribute('class','toDoList_check')
        newCheck.innerHTML='<input type="checkbox" class="toDoList_checkBox">'
        var newText = document.createElement('div');
        newText.setAttribute('class','toDoList_text');
        newText.innerText = toDoThing;

        newToDoThing.appendChild(newCheck);
        newToDoThing.appendChild(newText);
        list_list.append(newToDoThing);
        $("#toDoThing").val("");
}


function quiz(){
    $("#quiz_start").click(function(){
        $(".main_screen_list").hide();
        $("#quiz_start_screen").show();
        round = 0;
        correctPoint = 0;
        quizStart();
    })
    $("#quiz_exit").click(function(){
        $(".main_screen_list").hide();
        $("#home_screen").show();
    })
}
var round = 0;
var correctPoint =0;
var quizList = [
    {question : '1+1',
     answer : {
        a : "1" , 
        b : "2" , 
        c : "3" , 
        d : "4"
     },
     correct : 'b'
    },
    {question : '2+2' ,
     answer : {
        a : "4" ,
        b : "7" , 
        c : "11" , 
        d : "31"
     },
     correct : 'a'
    },
    {question : '3+3',
     answer : {
        a : "1" ,
        b : "5" ,
        c : "6" ,
        d : "10"
     },
     correct : "c"
    },
    {question : '5+10',
     answer : {
        a : "11" ,
        b : "15" ,
        c : "20" ,
        d : "21"
     },
     correct : "b"
    },
    {question : '13+13',
     answer : {
        a : "11" ,
        b : "18" ,
        c : "23" ,
        d : "26"
     },
     correct : "d"
    }
]
function quizStart(){
    if(round==5) {
        $(".main_screen_list").hide();
        $("#quiz_finish_screen").show();
        $("#quiz_finish_correctCount").text(correctPoint);
        $("#quiz_finish_incorrectCount").text((quizList.length - correctPoint));    //질문갯수-맞춘갯수
    }
    $(".quiz_answerList").off("click");
    $(".quiz_answerList").css('background-color','rgb(221, 221, 221)'); //버튼색 되돌리기
    $("#quiz_start_correctCount").text(correctPoint)        //정답갯수 표시
    $("#quiz_start_round_span").text(round+1);              //round 표시
    $("#quiz_start_quiz").text(quizList[round].question);   //round에 맞는 question 표시
    $("#answer1").text(quizList[round].answer.a);           //정답리스트 표시
    $("#answer2").text(quizList[round].answer.b);
    $("#answer3").text(quizList[round].answer.c);
    $("#answer4").text(quizList[round].answer.d);

    $(".quiz_answerList").click(function(){
        if($(this).val() == quizList[round].correct){       //버튼의 value와 correct의 값이 같다면
            correctPoint++
            round++
            $(this).css('background-color','greenyellow');
            $("#correctAnswer").show();
            setTimeout(function(){
                $("#correctAnswer").hide();
            },1000);
            $("#quiz_start_correctCount").text(correctPoint)        //정답갯수 표시
        } else{
            round++
            $(this).css('background-color','red');
            $("#incorrectAnswer").show();
            setTimeout(function(){
                $("#incorrectAnswer").hide();
            },1000);
            $("#quiz_start_correctCount").text(correctPoint)        //정답갯수 표시
        }
        setTimeout(function(){
            quizStart();
        },1000);
    })
}

function quizFinish(){
    $("#quiz_reStart").click(function(){
        $(".main_screen_list").hide();
        $("#quiz_start_screen").show();
        round = 0;
        correctPoint = 0;
        quizStart();
    })
    $("#quiz_toGoQuiz").click(function(){
        $(".main_screen_list").hide();
        $("#quiz_home_screen").show();
    })
    $("#quiz_toGoHome").click(function(){
        $(".main_screen_list").hide();
        $("#home_screen").show();
    })
}
var clickedNum;
var displayedNum = "";
var parentheses = 1;
var first_parentheses = "(";
var second_parentheses = ")";

function calculate(){           //계산기
    $(".calcBtn").click(function(){     //버튼클릭시
        clickedNum = $(this).text();
        if(clickedNum !="AC" &&
            clickedNum != "()" &&
            clickedNum != "←" &&
            clickedNum != "=")
        displayedNum += clickedNum;
        $("#calc_firstScreen").text(displayedNum);
    })

    $("#calc_AC").click(function(){               //리셋
        displayedNum = "";
        parentheses = 1;
        $("#calc_firstScreen").text("");
        $("#calc_secondScreen").text("");
    })

    $("#calc_parentheses").click(function(){           //괄호
        parentheses++
        if(parentheses%2==0){ //첫번째클릭시 ( 두번쨰클릭시 ) 출력
            displayedNum += first_parentheses;
        } else {
            displayedNum += second_parentheses;
        }
        $("#calc_firstScreen").text(displayedNum);
    })

    $("#calc_delete").click(function(){               //지우기
        displayedNum = displayedNum.slice(0,-1);
        $("#calc_firstScreen").text(displayedNum)
    })

    $("#calc_result").click(function(){                  // 결과보기
        var result = eval(displayedNum);
        // if(result.toString().includes('.')){
        //     var sosuLength = result.toString().split('.')[1].length;
        //     result = parseFloat(result).toFixed(sosuLength);
        //     $("#calc_secondScreen").text(result);
        // } else{
            
        // }
        $("#calc_secondScreen").text(result);

    })
    document.addEventListener('keydown', function (event){ //키패드 입력을 통한 출력
        var keypadClick = event.key;
        if ((keypadClick >= '0' && keypadClick <= '9' || keypadClick === '/' ||
        keypadClick === '+' || keypadClick === '-' || keypadClick === '*' ||
        keypadClick === '(' || keypadClick === ')' || keypadClick === '.') &&
        (event.code.startsWith('Numpad') || event.code.startsWith('Digit'))) {
            displayedNum += keypadClick;
            $("#calc_firstScreen").text(displayedNum);
        }

        if (event.key === 'Escape') {                           //esc -> 모두지우기
            displayedNum = "";
            parentheses = 1;
            $("#calc_firstScreen").text("");
            $("#calc_secondScreen").text("");
        }

        if (event.key === 'Enter' || event.code === 'NumpadEnter') {    // enter -> 결과보기
            var result = eval(displayedNum);
            $("#calc_secondScreen").text(result);
        }

        if (event.key === 'Backspace') {            // 백스페이스 -> 지우기
            displayedNum = displayedNum.slice(0,-1);
            $("#calc_firstScreen").text(displayedNum)
        }
    })
}


function toHome(){
    $("#menuList").hide();
    $(".main_screen_list").hide();
    $("#home_screen").show();
}
function toCall(){
    $("#display_number").text("")
    $("#menuList").hide();
    $(".main_screen_list").hide();
    $("#call_screen").show();
    callScreen();
}
function toToDoList(){
    $("#menuList").hide();
    $(".main_screen_list").hide();
    $("#toDoList_screen").show();
    document.getElementById('toDoThing').focus();
}
function toQuiz(){
    $("#menuList").hide();
    $(".main_screen_list").hide();
    $("#quiz_home_screen").show();
}
function toCalc(){
    $("#calc_firstScreen").text("");
    $("#calc_secondScreen").text("");
    displayedNum = 0;
    $("#menuList").hide();
    $(".main_screen_list").hide();
    $("#calculator_screen").show();
}









