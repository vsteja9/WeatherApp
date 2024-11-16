import { Box, TextField, Typography } from "@mui/material";
import "./WeatherPage.css";
import SearchIcon from "@mui/icons-material/Search";
import sungifs from "../assets/sungifs.gif";
import windIcon from "../assets/windIcon.png";
import humidityIcon from "../assets/humidityIcon.png";
import { useState } from "react";

const API_KEY = "dc4ae5557fe372871d6b224ff92bee89";
export default function WeatherPage() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({
    temparature: "16",
    location: "Delhi",
    windSpeed: "12",
    humidity: "90",
  });
  const fetchData = async (city: string) => {
    if (city === "") {
      alert("please enter valid City");
      return;
    }
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      const data = await response.json();
      const weather = {
        temparature: data.main.temp,
        location: data.name,
        windSpeed: data.wind.speed,
        humidity: data.main.humidity,
      };
      setWeatherData(weather);
    } catch (err: any) {
      alert(err.message);
    }
    // fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    // )
    //   .then((res) => res.json())
    //   .then((data) => {
    //     const weather = {
    //       temparature: data.main.temp,
    //       location: data.name,
    //       windSpeed: data.wind.speed,
    //       humidity: data.main.humidity,
    //     };
    //     setWeatherData(weather);
    //   })
    //   .catch((err) => alert(`got error ${err}`));

    setCity("");
  };

  // useEffect(() => {
  //   fetchData("london");
  // }, [datasubmit]);
  return (
    <Box className="displayBox">
      <Box className="searchBar">
        <TextField
          placeholder="Search"
          size="small"
          value={city}
          focused={false}
          onChange={(e) => {
            setCity(e.target.value);
          }}
          style={{
            border: "none",
            backgroundColor: "white",
            borderRadius: "40px",
          }}
        />
        <div
          style={{
            backgroundColor: "white",
            height: "40px",
            width: "40px",
            cursor: "pointer",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            borderRadius: "60%",
          }}
          onClick={() => {
            fetchData(city);
            // setDataSubmit((prev) => !prev);
          }}
        >
          <SearchIcon />
        </div>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img src={sungifs} alt="...Loading" height={"110px"} width={"110px"} />
        <Typography color="white" fontSize={"50px"}>
          {weatherData.temparature}°C
        </Typography>
        <Typography color="white" fontSize={"30px"}>
          {weatherData.location}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          marginTop: "20px",
        }}
      >
        <Box>
          {" "}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={humidityIcon}
              alt="...Loading"
              height={"50px"}
              width={"50px"}
            />
            <Typography
              color="white"
              fontSize={"20px"}
              marginLeft={"15px"}
              fontWeight={"bold"}
            >
              {weatherData.humidity}%
            </Typography>
          </Box>
          <Typography color="white" marginTop={"10px"}>
            Humidity
          </Typography>
        </Box>
        <Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <img
              src={windIcon}
              alt="...Loading"
              height={"50px"}
              width={"50px"}
            />
            <Typography color="white" fontSize={"20px"} fontWeight={"bold"}>
              {weatherData.windSpeed} Km/h
            </Typography>
          </Box>
          <Typography color="white" marginTop={"10px"}>
            Wind Speed
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
