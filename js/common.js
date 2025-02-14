var fixScroll = 0;
$(window).scroll(function () {
    var scroll = $(this).scrollTop();
    if (scroll > 50) {
        $(".header").addClass("fix");
    }
    else {
        $(".header").removeClass("fix");
    }
    fixScroll = scroll;
});

var $select_toggle = $('.form-group').find('.slect-menu');
var $body = $('body');
$select_toggle.click(function(){
    var $this = $(this);
    $this.find('.slect-menu').sibling('ul').toggleClass('active');
    alert('eee');
});


$(window).on('load',function () {
    // select
    var $select_toggle = $('.form-group').find('.slect-menu');
    $select_toggle.click(function(){
        var $this = $(this);
        $this.siblings('ul').slideToggle('active');
        $this.siblings('ul').find('li').click(function(){
            var $this = $(this),
                $select_txt = $this.text(),
                $select_span = $('.slect-menu').find('span');

            $this.parent('ul').slideUp();
            $select_span.text($select_txt);
        })

    });
// checkAll
    var $checkAll = $('input[data-group="checkall"]');
   
    $checkAll.change(function(){
        var $this = $(this),
            checked = $this.prop('checked');
            $('input[data-group="check"]').prop('checked',checked)
           
    })
    var check = $('input[data-group="check"]');
check.change(function(){
    var checkLength = check.length,
        checkedLength = $('input[data-group="check"]:checked').length,
        selectAll = (checkLength == checkedLength);

        $checkAll.prop('checked', selectAll);
    })

    // check_one
    var check_one = $('input[data-group="check-one"]')
    check_one.click(function(){
        if($(this).prop('checked')){
            $('input[data-group="check-one"]').prop('checked',false);
            $(this).prop('checked',true);
        }
    })
});




//pop-up
var Layer_OPEN = function (obj) {
    $('html').css('overflow', 'hidden');
    $(obj).show();
    setTimeout(function () {
        $(obj).addClass('active');
    }, 10);
};

var Layer_CLOSE = function (obj) {
    $('html').css('overflow', '');
    $(obj).removeClass('active');
    setTimeout(function () {
        $(obj).hide();
    }, 200);
};

$(window).on('load',function () {
	$('body').on('click', '.close', function () {
		var obj = '#' + $(this).closest('.pop-wrap').attr('id');
		if ($(obj).hasClass('not-dim')) {
			return;
		} else {
			Layer_CLOSE(obj);
		}
	});


   
});



// datepicker swiper
$(function () {
	var $this = $(this),
		$body = $('body');

	$this.find($body).ready(function () {
		$('input[type="text"].docs-date').datepicker();
	})

});
// datepicker
$.datepicker.setDefaults({
	dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
	dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
	monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
	dateFormat: "yy-mm-dd",
	showMonthAfterYear: true,
	yearSuffix: '년',
	maxDate: 0,
	yearRange: "-90:+0",
    prevText: '이전달',
    nextText: '다음달',
    changeMonth: true,
    changeYear: true,
    showMonthAfterYear: true,
    yearRange: "1990:"         // 선택할수있는 최소날짜, ( 0 : 오늘 이후 날짜 선택 불가)
});




jQuery(document).ready(function(){

    //########################## Method ##########################
    var article = {

        setSubmit:function(){												// @  
            if (article.getIsVaild() == false){return false;}
            msgjs = "입력하신 내용을 저장 하시겠습니까?";
            if(confirm(msgjs)){
                var params = jQuery('#frm').serialize();
                var reqUrl = 'exec.asp';
                $.ajax({
                   type : "POST",  
                   url :  reqUrl, 
                   data : params,
                   async : true,
                   cache : false, 
                   dataType:'json',
                   success : function(data){
                      article.setMessage("정상적으로 저장되었습니다!");
                      if (data.srtIsSuccess=="true"){
                          article.goWritePate();
                          return false;
                       }
                   }, 
                   error : function(){
                      article.setMessage('주의! 정상적으로 처리되지 않았습니다. \n 다시 시도해 주세요!');
                      return false;
                   }
               });
            }else{
                return false;
            }
        },
        getIsVaild:function(){												//@ 유효성 검사
            var f = document.frm;

            if(f.Name.value == "")
            {
                article.setMessage("아동·청소년 이름을 입력해주세요.");
                f.Name.focus();
                return false;
            }
            if(f.Name.value.length < 2)
            {
                article.setMessage("아동·청소년 이름은 2자 이상 입력해주세요.");
                f.Name.focus();
                return false;
            }
            if(f.Birth.value == "")
            {
                article.setMessage("생년월일을 입력해주세요.");
                f.Birth.focus();
                return false;
            }
            if(f.Youth_State.value == "")
            {
                article.setMessage("아동·청소년 상태를 선택해주세요.");
                f.Youth_State.focus();
                return false;
            }
            if(f.School.value == "")
            {
                article.setMessage("학령을 선택해주세요.");
                f.School.focus();
                return false;
            }
            if(f.Grade.value == "")
            {
                article.setMessage("학년을 선택해주세요.");
                f.Grade.focus();
                return false;
            }
            if(f.SURVEY_TARGET.value == "young")
            {
                if(f.School.value == "1")
                {
                    if(f.Grade.value == "4" || f.Grade.value == "5" || f.Grade.value == "6")
                    {
                        alert("초등학교 3학년 이하로 선택해주세요.");
                        return false;
                    }
                }
                if(f.School.value == "2" || f.School.value == "3")
                {
                    alert("초등학교 3학년 이하로 선택해주세요.");
                    return false;
                }
            }
            if(f.SURVEY_TARGET.value == "old")
            {
                if(f.School.value == "0")
                {
                    alert("초등학교 4학년 이상으로 선택해주세요.");
                    return false;
                }
                if(f.School.value == "1")
                {
                    if(f.Grade.value == "1" || f.Grade.value == "2" || f.Grade.value == "3")
                    {
                        alert("초등학교 4학년 이상으로 선택해주세요.");
                        return false;
                    }
                }
            }
            if(f.Gender.value == "")
            {
                article.setMessage("성별을 선택해주세요.");
                f.Gender.focus();
                return false;
            }
            /**
            if(f.Phone_Own_YN.value == "")
            {
                article.setMessage("스마트폰 소유여부를 선택해주세요.");
                f.Phone_Own_YN.focus();
                return false;
            }
            
            if(f.Phone_Own_YN.value == "Y")
            {
                if(f.Phone.value == "")
                {
                    article.setMessage("아동·청소년 연락처를 입력해주세요.");
                    f.Phone.focus();
                    return false;
                }
            }
            **/
            if(f.Phone.value != "")
            {
                var pchk = f.Phone.value;
                pchk = pchk.replace(/-/g, "");
                pchk = pchk.replace(/ /gi, "");

                if(pchk.length < 10 || pchk.length > 11)
                {
                    alert("연락처 자릿수는 10~11자리만 허용됩니다.\n\n다시 확인해주세요");
                    f.Phone.focus();
                    return false;
                }

                if (pchk.substring(0,3) != "010" && pchk.substring(0,3) != "011" && pchk.substring(0,3) != "016" && pchk.substring(0,3) != "017" && pchk.substring(0,3) != "018" && pchk.substring(0,3) != "019" )
                {
                    alert("유효하지 않은 핸드폰 번호 입니다.\n\n다시 확인해주세요");
                    f.Phone.focus();
                    return false;
                }
            }
            
            if(f.KCOM_ID.value == "")
            {
                article.setMessage("주소의 시도를 선택해주세요.");
                f.KCOM_ID.focus();
                return false;
            }
            if(f.Address.value == "")
            {
                article.setMessage("주소를 입력해주세요.");
                f.Address.focus();
                return false;
            }
            if(f.Address.value.length < 10)
            {
                article.setMessage("주소는 10자 이상 입력해주세요.");
                f.Address.focus();
                return false;
            }
            

            return true;
        },
        goWritePate : function(){
            var f = document.frm;
            var reqUrl = "";

            if(f.SURVEY1.value == "Y")
            {
                reqUrl = "/survey01.asp";
            }
            else
            {
                reqUrl = "/survey03.asp";
            }
            
            jQuery('#frm').attr({action:reqUrl,method:'post'}).submit();
        },
        setSchool  : function(){
            var f = document.frm;
            var val = f.Youth_State.value;

            $("#School").empty();
            $("#Grade").empty();
            
            if (val == "N")
            {
                $("#School").append("<option value='0'>해당없음</option>");
                $("#Grade").append("<option value='0'>해당없음</option>");
            }
            else if(val == "S" || val == "W")
            {
                $("#School").append("<option value=''>학령선택</option>");
                $("#School").append("<option value='1'>초등</option>");
                $("#School").append("<option value='2'>중등</option>");
                $("#School").append("<option value='3'>고등</option>");

                $("#Grade").append("<option value=''>학년선택</option>");
            }
            else{}
        },
        setGrade  : function(){
            var f = document.frm;
            var val = f.School.value;

            $("#Grade").empty();

            if (val == "1")
            {
                $("#Grade").append("<option value=''>학년선택</option>");
                $("#Grade").append("<option value='1'>1학년</option>");
                $("#Grade").append("<option value='2'>2학년</option>");
                $("#Grade").append("<option value='3'>3학년</option>");
                $("#Grade").append("<option value='4'>4학년</option>");
                $("#Grade").append("<option value='5'>5학년</option>");
                $("#Grade").append("<option value='6'>6학년</option>");
            }
            else if(val == "2" || val == "3")
            {
                $("#Grade").append("<option value=''>학년선택</option>");
                $("#Grade").append("<option value='1'>1학년</option>");
                $("#Grade").append("<option value='2'>2학년</option>");
                $("#Grade").append("<option value='3'>3학년</option>");
            }
            else{}
        },
        setMessage:function(messageString){							//@ 에러 메세지 삽입
            alert(messageString);
        }

    }

    //########################## Click Event #####################

    $('#btnNext').click(function(){
        article.setSubmit();
    });
    
    $('#goback').click(function(){
        history.back(-1);
    });

    $('#Youth_State').change(function(){
        article.setSchool();
    });

    $('#School').change(function(){
        article.setGrade();
    });

});
