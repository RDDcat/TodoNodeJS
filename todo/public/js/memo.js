const form = document.getElementById("memo-form");

form.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent the form from submitting normally

    const formData = new FormData(form);

    fetch("http://ec2-18-183-36-88.ap-northeast-1.compute.amazonaws.com:8000/board", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
});