export const renderWeatherImage=(icon:string)=>{
    switch (icon){
        case '01d':
            return require("../../../assets/weather/01d.jpg")
        case '01n':
            return require("../../../assets/weather/01n.jpg")
        case '02d':
            return require("../../../assets/weather/02d.jpg")
        case '02n':
            return require("../../../assets/weather/02n.jpg")
        case '03d':
            return require("../../../assets/weather/03d.jpg")
        case '03n':
            return require("../../../assets/weather/03n.jpg")
        case '04d':
            return require("../../../assets/weather/04d.jpg")
        case '04n':
            return require("../../../assets/weather/04n.jpg")
        case '10d':
            return require("../../../assets/weather/10d.jpg")
        case '10n':
            return require("../../../assets/weather/10n.jpg")
        case '11d':
            return require("../../../assets/weather/11d.jpg")
        case '11n':
            return require("../../../assets/weather/11n.jpg")
        case '13d':
            return require("../../../assets/weather/13d.jpg")
        case '13n':
            return require("../../../assets/weather/13n.jpg")
        case '50d':
            return require("../../../assets/weather/50d.jpg")
        case '50n':
            return require("../../../assets/weather/50n.jpg")

    }
}
