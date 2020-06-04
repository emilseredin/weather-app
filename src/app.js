const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
const publicPathDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials"); 

app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

app.use(express.static(publicPathDir));
app.get("", (req, res) => {
    res.render("index", {
        title: "App",
        header: "Weather App",
        name: "Emil Seredin"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About",
        header: "About Us",
        name: "Emil Seredin"
    });
});

app.get("/weather", (req, res) => {    
    const location = req.query.address;
    
    if (!location) {
        return res.send({
            error: "You must provide an address" 
        });
    }

    geocode(location, (error, { location, coordinates: { latitude, longitude } = {} } = {}) => {
        if (error) {
            return res.send({ error });
        }
    
        forecast(latitude, longitude, (error, { temperature, feelslike }) => {
            if (error) {
                return res.send({ error });
            } 
    
            return res.send({ temperature, feelslike, location });
        });
    });
});

app.get("/help", (req, res) => {
    res.render("help", {
        title: "Help",
        header: "How can we help you?",
        name: "Emil Seredin"
    });
});

app.get("/help/*", (req, res) => {
    res.render("page_404", {
        title: "404",
        header: "404",
        error_message: "Help article not found",
        name: "Emil Seredin"
    });
});

app.get("*", (req, res) => {
    res.render("page_404", {
        title: "404",
        header: "404",
        error_message: "This page does not exist.",
        name: "Emil Seredin"
    });
});

app.listen(3000, () => {
    console.log("Server is up on port 3000");
});

