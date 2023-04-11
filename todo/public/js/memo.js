const form = document.getElementById("memo-form");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent the form from submitting normally

    const formData = new FormData(form);
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