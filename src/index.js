const express = require("express");
const cors = require("cors");
const { ServerConfig, Logger } = require("./config");
const apiRoutes = require("./routes");

const app = express();
app.use(cors({ origin: "http://localhost:5173" }));

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use("/api", apiRoutes);

app.listen(ServerConfig.PORT, async () => {
    console.log(`Server started running on PORT: ${ServerConfig.PORT}`);
});