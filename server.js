import express from "express";
import router from "./routes/product.js";
import errorHandler from "./middleware/error.js";
import authRoles from "./routes/auth.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/product", router);
app.use("/api/auth", authRoles);

//Middleware
app.use(errorHandler);

app.listen(8000, () => console.log("Server is running on port 8000"));
