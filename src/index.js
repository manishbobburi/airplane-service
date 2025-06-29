const express = require("express");
const { ServerConfig, Logger } = require("./config");
const apiRoutes = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    const { Airport, City } = require("./models");
    console.log(`Server started running on PORT: ${ServerConfig.PORT}`);
    // const hyderabad = await City.findByPk(11);
    // const rjiAirport = await Airport.findByPk(23)
    // Airport.destroy({where:{id: 13}});
    // hyderabad.createAirport({name: "Manish Intl", code: "BND", address: null});
    await City.destroy({where:{
        id:4,
    }});
    // hyderabad.removeAirport(rjiAirport);
});