//来自https://imjad.cn，由 journey.ad 创作
function renderTip(template, context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;
    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;
        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}

String.prototype.renderTip = function (context) {
    return renderTip(this, context);
};

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage('討厭啦！不要偷看制台的秘密~', 5000);
    return '';
};

$(document).on('copy', function (){
    showMessage('複製後要記得註明出處哦！', 5000);
});

function initTips(){
    $.ajax({
        cache: true,
        url: "message.json",
        dataType: "json",
        success: function (result){
            $.each(result.mouseover, function(index, tips) {
                if(tips.text == "") {
                    $(tips.selector).hover(function() {
                        clearInterval(shexiaotu)
                    }, function() {
                         shexiaotu=window.setInterval(function(){
                            showMessage(result.hitokoto, 6000);
                        },14000);
                    });
                } else {
                    $(tips.selector).mouseover(function() {
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 6000);
                    });
                }
            });
            $.each(result.click, function (index, tips){
                $(tips.selector).click(function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.renderTip({text: $(this).text()});
                    showMessage(text, 6000);
                });
            });
        }
    });
}
initTips();

(function (){
    var text;
            var now = (new Date()).getHours();
            if (now > 21 || now <= 5) {
                text = '工作之餘也要注意身體哦，早點休息吧。';
            } else if (now > 5 && now <= 10) {
                text = '早安！今天我們又更新了許多精美的圖片哦，<a href="/best.html" style="color:#0099e5;" target="_blank">快去看看吧 </a>~';
            } else if (now > 10 && now <= 14) {
                text = '餓了嗎？要不要按按美食素材呢~ 然後就會更餓啦！';
            } else if (now > 14 && now <= 17) {
                text = '下午的工作也要加油哦。';
            } else if (now > 17 && now <= 19) {
                text = '快要下班了吧，今天辛苦啦！';
            } else if (now > 19 && now <= 21) {
                text = '晚安啦！要不要下載點素材明天用呢！';
            }else {
                text = '工作之餘也要注意身體哦，早點休息吧。';
            }
    showMessage(text, 12000);
})();

showHitokoto();
var shexiaotu
function showHitokoto(){
    $.getJSON('usakoto.json',function(result){
        shexiaotu=window.setInterval(function(){
            showMessage(result.hitokoto, 6000);
        },14000);
    });
}

function showMessage(text, timeout){
    if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    //console.log('showMessage', text);
    $('.message').stop();
    if(text != undefined){
        $('.message').html(text).fadeTo(200, 1);
    }
    if (timeout === null) timeout = 6000;
    hideMessage(timeout);
}

function hideMessage(timeout){
    $('.message').stop().css('opacity',1);
    if (timeout === null) timeout = 6000;
    $('.message').delay(timeout).fadeTo(200, 0);
}

function initLive2d (){
    $('.hide-button').fadeOut(0).on('click', function(){
        $('#landlord').css('display', 'none')
    })
    $('#landlord').hover(function(){
        $('.hide-button').fadeIn(600)
    }, function(){
        $('.hide-button').fadeOut(600)
    })
}
initLive2d ();
