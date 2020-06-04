const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;

    if (location) {
        const uri = "/weather?address=" + location;
        const locationText = document.querySelector(".location-text");
        const forecastText = document.querySelector(".forecast-text");
        locationText.textContent = "Loading...";
        forecastText.textContent = "";
        fetch(uri).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    locationText.textContent = data.error;
                    return;
                }
                locationText.textContent = data.location;
                forecastText.textContent = "It is currently " + data.temperature + " degrees. It feels like " + data.feelslike + " degrees out.";
            });
        }); 
    }
});
