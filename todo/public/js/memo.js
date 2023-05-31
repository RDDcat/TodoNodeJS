const form = document.getElementById("memo-form");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent the form from submitting normally

    const formData = new FormData(form);
    formData.append("userId", getCookie("user"));
    const formDataObj = Object.fromEntries(formData.entries());
    console.log(formDataObj);

    fetch("http://ec2-18-183-36-88.ap-northeast-1.compute.amazonaws.com:8000/board", {
        headers: {
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify(formDataObj)
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});




// 내가 만든 쿠키~ 
function setCookie(cookie_name, value, days) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + days);  
    var cookie_value = escape(value) + ((days == null) ? '' : '; expires=' + exdate.toUTCString());
    document.cookie = cookie_name + '=' + cookie_value;
}

// setCookie('user', '1234', 1);

function getCookie(cookie_name) {
    var x, y;
    var val = document.cookie.split(';');

    for (var i = 0; i < val.length; i++) {
        x = val[i].substr(0, val[i].indexOf('='));
        y = val[i].substr(val[i].indexOf('=') + 1);
        x = x.replace(/^\s+|\s+$/g, ''); // 앞과 뒤의 공백 제거하기
        if (x == cookie_name) {
            return unescape(y); // unescape로 디코딩 후 값 리턴
        }
    }
}