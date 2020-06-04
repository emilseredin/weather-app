const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = search.value;

    if (location) {
        const uri = "/weather?address=" + location;
        const locationText = document.querySelector(".location-text");
        const forecastText = document.querySelector(".forecast-text");
        const image = document.querySelector(".sky-image");
        locationText.textContent = "Loading...";
        forecastText.textContent = "";
        image.src = "";
        image.alt = "";

        fetch(uri).then((response) => {
            response.json().then((data) => {
                if (data.error) {
                    locationText.textContent = data.error;
                    return;
                }
                image.src = data.icon;
                image.alt = "sky icon";
                locationText.textContent = data.location;
                forecastText.textContent = data.description + ". ";
                forecastText.textContent += "It is currently " + data.temperature;
                forecastText.textContent += " degrees. It feels like " + data.feelslike;
                forecastText.textContent += " degrees out.";
                forecastText.textContent += " Air humidity is " + data.humidity + "%";
                forecastText.textContent += " and cloudcover is " + data.cloudcover + "%";
            });
        }); 
    }
});
