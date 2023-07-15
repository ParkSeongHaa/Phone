$(function(){
    getDate()
    getTime()
    getweather()
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

//----------------------------------날짜---------------------------------------------------------
let today = new Date();
let dateInterval = setInterval(getDate,1000)
function getDate(){                         //날짜표시
    today = new Date();
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
//----------------------------------시간---------------------------------------------------------
let timeInterval = setInterval(getTime,1000)
function getTime(){                         //시간표시
    today = new Date();
    let hours = today.getHours(); // 시
    let minutes = today.getMinutes();  // 분
    let StringMinLength = minutes.toString().length;
     if(StringMinLength==1){        //10분 미만일때 0을 붙임
         minutes = "0"+minutes;
     }

    let timeOnScreen = hours + ":" + minutes
    console.log(timeOnScreen);
    $("#time").text(timeOnScreen);
}

//----------------------------------날씨---------------------------------------------------------
var cityMap = {
    "서울": "Seoul",
    "부산": "Busan",
    "인천": "Incheon",
    "대구": "Daegu",
    "대전": "Daejeon",
    "광주": "Gwangju",
    "수원": "Suwon",
    "울산": "Ulsan",
    "창원": "Changwon",
    "고양": "Goyang",
    "용인": "Yongin",
    "성남": "Seongnam",
    "부천": "Bucheon",
    "안산": "Ansan",
    "안양": "Anyang",
    "화성": "Hwaseong",
    "경기도": "Gyeonggi-do",
    "강원도": "Gangwon-do",
    "충청북도": "Chungcheongbuk-do",
    "충청남도": "Chungcheongnam-do",
    "전라북도": "Jeollabuk-do",
    "전라남도": "Jeollanam-do",
    "경상북도": "Gyeongsangbuk-do",
    "경상남도": "Gyeongsangnam-do",
    "제주도": "Jeju-do"
  };
$("#cityName").click(function(){            //도시 리스트 활성화
    $("#cityList").slideToggle();
})
let clickedCity = 'Daegu'
let cityLat;
let cityLon;
$(".koreaCitys").click(function(){          //도시 변경
    clickedCity = cityMap[$(this).text()];
    $("#cityName").text($(this).text());
    $("#cityList").css('display','none');
    $("#temp_per_hour").text("")
    $("#weekTempBox").text("")
    getweather();
})

// let weatherInterval = setInterval(getweather,600000) //10분에 한번
function getweather(){
    const sunny = '<img src="./img/sunny.png" class="weatherIcon">';
    const rain = '<img src="./img/rain.png" class="weatherIcon">';
    const cloud = '<img src="./img/cloud.png" class="weatherIcon">';
    const snow = '<img src="./img/snow.png" class="weatherIcon">';
    const storm = '<img src="./img/storm.png" class="weatherIcon">';
    const mist = '<img src="./img/mist.png" class="weatherIcon">';
    let todayWeatherBackground;
             $.ajax({
                url:'https://api.openweathermap.org/data/2.5/weather?q=' +  clickedCity + ',kr&APPID=a0cd335023e5654308fd81198ce68f9c',
                method:'get',
                dataType:'json'
            }).done(function(response){ //api로 가져온 날씨정보 response에 저장
                console.log("콘솔1")
                console.log(response)
                let todayWeather=response.weather[0].main;
                if(todayWeather == 'Clear') {
                    todayWeather = sunny;
                    todayWeatherBackground = 'sunny';
                } else if(todayWeather == 'Rain'){
                    todayWeather = rain;
                    todayWeatherBackground = 'rain';
                } else if(todayWeather == 'Clouds') {
                    todayWeather = cloud;
                    todayWeatherBackground = 'cloud';
                } else if(todayWeather == 'Snow') {
                    todayWeather = snow;
                    todayWeatherBackground = 'snow';
                } else if(todayWeather == 'Thunderstorm') {
                    todayWeather = storm;
                    todayWeatherBackground = 'storm';
                } else if(todayWeather == 'Mist'){
                    todayWeather = mist;
                    todayWeatherBackground = 'mist';
                } else {
                    todayWeather = "";
                }

                $("#weather").html("　　<span>" +           //상단표시줄
                            (response.main.temp -273.15).toFixed(1) + "</span>" + 
                            "　" + todayWeather)
                $("#weather_screen_background").removeClass();                      //기존배경삭제
                $("#weather_screen_background").addClass("main_screen_list")        // list Class 추가
                $("#weather_screen_background").addClass(todayWeatherBackground)    //날씨배경 추가
                $("#temperature").text((response.main.temp -273.15).toFixed(1)+"º") //온도 표시
                $("#explain_weather").html(response.weather[0].main)                //날씨 설명
                $("#high_low_temperature").text("최고:"+(response.main.temp_max-273.15).toFixed(1)+"º　최저"+
                                                (response.main.temp_min-273.15).toFixed(1)+"º")
            })

            $.ajax({        //입력 도시 위도경도 찾기
                url:'http://api.openweathermap.org/geo/1.0/direct?q='+clickedCity+'&limit=5&appid=a0cd335023e5654308fd81198ce68f9c',
                method:'get',
                dataType:'json'
            }).done(function(response){
                console.log("콘솔2")
                console.log(response);
                cityLat = response[0].lat;
                cityLon = response[0].lon;
                $.ajax({        
                    url: 'http://api.openweathermap.org/data/2.5/forecast?lat='+cityLat+'&lon='+cityLon+'&appid=a0cd335023e5654308fd81198ce68f9c',
                    method:'get',
                    dataType:'json'
                }).done(function(response2){
                    console.log("콘솔3")
                    console.log(response2)
                    let weatherIconInUnit;
                    let time = 6;
                    for(var i=0; i<7; i++){     //오늘하루 3시간 단위로 날씨표시(7번)
                        
                        let temp_per_hour_unit = document.createElement('div')
                        temp_per_hour_unit.setAttribute('class','temp_per_hour_unit')

                        let tempTime = document.createElement('div');
                        tempTime.setAttribute('class','tempTime');
                        tempTime.innerHTML = (time + i*3) + "시"

                        let tempIcon = document.createElement('div');
                        tempIcon.setAttribute('class','tempIcon');
                        if(response2.list[i].weather[0].main == 'Clear'){
                            weatherIconInUnit = sunny;
                        } else if(response2.list[i].weather[0].main == 'Rain'){
                            weatherIconInUnit = rain;
                        } else if(response2.list[i].weather[0].main == 'Clouds'){
                            weatherIconInUnit = cloud;
                        } else if(response2.list[i].weather[0].main == 'Snow'){
                            weatherIconInUnit = snow;
                        } else if(response2.list[i].weather[0].main == 'Storm'){
                            weatherIconInUnit = storm;
                        } else if(response2.list[i].weather[0].main == 'Mist'){
                            weatherIconInUnit = mist;
                        }
                        tempIcon.innerHTML = weatherIconInUnit;

                        let temp = document.createElement('div');
                        temp.setAttribute('class','temp');
                        temp.innerHTML = (response2.list[i].main.temp-273.15).toFixed(1)+"º";

                        temp_per_hour_unit.appendChild(tempTime)
                        temp_per_hour_unit.appendChild(tempIcon)
                        temp_per_hour_unit.appendChild(temp)
                        $("#temp_per_hour").append(temp_per_hour_unit);
                        $(".tempIcon img").removeClass().addClass('tempIconImg');
                    }

                    // 5일간의 일기예보

                    for(var j=0; j<5; j++){
                        let eachWeekTemp = document.createElement('div')
                        eachWeekTemp.setAttribute('class','eachWeekTemp')

                        let day = document.createElement('div');                    //요일
                        day.setAttribute('class','day weekTempUnit');
                        if(j==0){
                            day.innerHTML="오늘"
                        } else{
                            var dayCount = today.getDay()+j
                            var weekday = new Array(7);
                            weekday[0] = "일요일";
                            weekday[1] = "월요일";
                            weekday[2] = "화요일";
                            weekday[3] = "수요일";
                            weekday[4] = "목요일";
                            weekday[5] = "금요일";
                            weekday[6] = "토요일";
                            let dayName = dayCount > 6 ?  weekday[dayCount-7] : weekday[dayCount]
                            day.innerHTML = dayName;
                        }


                        let weekWeatherIcon = document.createElement('div');            //날씨아이콘
                        weekWeatherIcon.setAttribute('class','weekWeatherIcon weekTempUnit');
                        let weekWeatherIconImg;
                        if(response2.list[j*8].weather[0].main == 'Clear'){
                            weekWeatherIconImg = sunny;
                        } else if(response2.list[j*8].weather[0].main == 'Rain'){
                            weekWeatherIconImg = rain;
                        } else if(response2.list[j*8].weather[0].main == 'Clouds'){
                            weekWeatherIconImg = cloud;
                        } else if(response2.list[j*8].weather[0].main == 'Snow'){
                            weekWeatherIconImg = snow;
                        } else if(response2.list[j*8].weather[0].main == 'Storm'){
                            weekWeatherIconImg = storm;
                        } else if(response2.list[j*8].weather[0].main == 'Mist'){
                            weekWeatherIconImg = mist;
                        }
                        weekWeatherIcon.innerHTML = weekWeatherIconImg;


                        let minTemp = document.createElement('div')                 //최저온도
                        minTemp.setAttribute('class','minTemp weekTempUnit')
                        let minTempArray = [];
                        for(var k=0; k<8; k++){                             //배열에 하루동안의 최저값을 담은후 최저값만 출력
                            var mix = (parseInt(j)*8)+parseInt(k)
                            minTempArray.push((response2.list[mix].main.temp_min-273.15).toFixed(1));
                        }
                        let minValue = Math.min.apply(null, minTempArray);
                        minTemp.innerHTML = minValue+"º";


                        let tempGraph = document.createElement('div')                   //온도그래프
                        tempGraph.setAttribute('class','tempGraph weekTempUnit')
                        tempGraph.innerHTML = '<div class="tempGraphBack"></div><div class="tempGraphFront"></div>'


                        let maxTemp = document.createElement('div')                    //최고온도
                        maxTemp.setAttribute('class','maxTemp weekTempUnit')
                        let maxTempArray = [];
                        for(var k=0; k<8; k++){                     //배열에 하루동안의 최고값을 담은후 최저값만 출력
                            var mix = (parseInt(j)*8)+parseInt(k)
                            minTempArray.push((response2.list[mix].main.temp_min-273.15).toFixed(1));
                        }
                        let maxValue = Math.max.apply(null, minTempArray);
                        maxTemp.innerHTML = maxValue+"º";

                        eachWeekTemp.appendChild(day)
                        eachWeekTemp.appendChild(weekWeatherIcon)
                        eachWeekTemp.appendChild(minTemp)
                        eachWeekTemp.appendChild(tempGraph)
                        eachWeekTemp.appendChild(maxTemp)
                        $("#weekTempBox").append(eachWeekTemp);
                        $(".weekWeatherIcon img").removeClass().addClass('tempIconImg');
                        $(".tempGraphFront").eq(j).css('width',(maxValue-minValue)*10)      //j번째 날짜의 그래프의 크기 조절
                    }


                })
            })
}

//----------------------------------화면전환---------------------------------------------------------

function displayMenu(){
    $("#menuList").hide();
    $("#topMenu").click(function(){     // 상단메뉴 클릭시 슬라이드 업 다운
        $("#menuList").slideToggle();
    })
}
function changeScreenFromBtn(){
    $("#bottom_btn").click(toHome); //홈키로 메인화면가기
}
function changeScreenInHome(){          //어플 클릭시 화면전환
    $("#call").click(toCall);           // 전화화면
    $("#toDoList").click(toToDoList); // ToDoList 화면 띄우기
    $("#quiz").click(toQuiz);           // 퀴즈 화면 띄우기
    $("#calculator").click(toCalc);     //계산기 화면 띄우기
    $("#weather").click(toWeather);     //날씨 어플로
    $("#weatherApp").click(toWeather);  //날씨 어플로
}
function changeScreenFromMenuBar(){     //상단 메뉴에서 클릭시 화면전환
    $("#tohome").click(toHome)      //홈화면으로
    $("#toCall").click(toCall)      //전화 화면으로
    $("#toToDoList").click(toToDoList)   //ToDoList 화면으로
    $("#toQuiz").click(toQuiz)      // 퀴즈 화면으로
    $("#toCalc").click(toCalc)      //계산기 화면으로
}

//----------------------------------전화---------------------------------------------------------

var number = "";
var click;
var count = 0;
var stick = "-";
function callScreen(){
    $(".callKeyPads").click(function(){
        var thisBtn = $(this);
        $(this).css('background-color','rgb(68, 68, 68)');      //클릭시 색변환
        setTimeout(function(){
            thisBtn.css('background-color',' rgb(209, 209, 209)'); //색 원래대로
        },250);
        click = $(this).text();
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
        deleteCallNum()
    })

    document.addEventListener('keydown', function (event){ //키패드 입력을 통한 출력
        var keypadClick = event.key;
        if(keypadClick >= '0' && keypadClick <= '9' && event.code.startsWith('Numpad') ||
        keypadClick >= '0' && keypadClick <= '9' && event.code.startsWith('Digit')) {
            number += keypadClick;
            count++
            if(count==3){
                number += stick;
            } else if(count==7){
                number += stick;
            }
            $("#display_number").text(number);

            var keyboardClickNum = parseInt(keypadClick);       
            if (keyboardClickNum >= 0 && keyboardClickNum <= 9) {       // 키보드로 숫자입력시에도 hover
                $("#"+keyboardClickNum).css('background-color','rgb(68, 68, 68)');      //클릭시 색변환
                setTimeout(function(){
                    $("#"+keyboardClickNum).css('background-color',' rgb(209, 209, 209)'); //색 원래대로
                },250);
            }

            // if (event.key === 'Backspace') {            // 백스페이스 -> 지우기     왜안돼지??
            //     deleteCallNum()
            // }
        }


    })
}

function deleteCallNum(){
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
}

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
        count = 0;
        number = "";
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
}

//----------------------------------ToDoList---------------------------------------------------------

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

//----------------------------------Quiz---------------------------------------------------------

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

//----------------------------------계산기---------------------------------------------------------

var clickedNum;
var displayedNum = " ";
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
        console.log(displayedNum)
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

function toWeather(){
    $("#menuList").hide();
    $(".main_screen_list").hide();
    $("#weather_screen_background").show();
    $("#weather_screen").show();
}







