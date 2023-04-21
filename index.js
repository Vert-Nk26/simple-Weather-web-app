// Get Key
const weatherAPIKey = "8f98636ea06ca11605c6564d75bb9fd4"

// Get All Element I will be Working With

const getForm = document.querySelector("form")
const getInput = document.querySelector("input")
const getIcon = document.querySelector(".weather_Icon_container")
const getTemperature = document.querySelector(".temperature")
const getDescription = document.querySelector(".description")
const getDetails = document.querySelector(".weatherDetails")

getForm.addEventListener("submit", e => {
  e.preventDefault()
  cityOrCountryValue()
  weatherData(cityOrCountryValue())
})

// || Get City/Country Value.....
const cityOrCountryValue = () => {
  const getCityOrCountryValue = getInput.value
  return getCityOrCountryValue
}

// || Get Weather Data

const weatherData = async value => {
  try {
    const getResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${weatherAPIKey}&units=metric`
    )
    if (!getResponse.ok) {
      throw new Error("NetWork Failed")
    }
    const getData = await getResponse.json()
    console.log(getData)

    const weatherIcon = getData.weather[0].icon
    const weatheTemperature = Math.round(getData.main.temp)
    const weatherDescription = getData.weather[0].description
    const weatherDetails = [
      `FEELS LIKE : ${Math.round(getData.main.feels_like)}˚C`,
      `HUMIDITY : ${getData.main.humidity} %`,
      `WIND SPEED : ${getData.wind.speed} M/S`,
    ]
    getIcon.innerHTML = ` <img
src=" https://openweathermap.org/img/wn/${weatherIcon}.png"
alt="weatherIcon"
/>`
    getTemperature.innerText = `${weatheTemperature}˚C`
    getDescription.innerText = weatherDescription
    getDetails.innerHTML = weatherDetails
      .map(detail => {
        return `<div>${detail}</div>`
      })
      .join("")
  } catch (error) {
    getIcon.innerHTML = ""
    getTemperature.innerText = ""
    getDescription.innerText = `No results found.
          Try searching for a city, postal or point of interest.`
    getDetails.innerHTML = ""
  }
}
