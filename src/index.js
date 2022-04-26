require("dotenv").config();
const cors = require("cors");
const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const mongoose = require("mongoose");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "rei",
  api_key: process.env.API_KEY || "648455811235865",
  api_secret: process.env.API_SECRET || "ge8zfwVr9-fZQ8UKqV28PAz9UTw",
});

app.use(express.static(__dirname + "/public"));
app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

// parse application/json
app.use(bodyParser.json({ limit: "50mb" }));

mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected DB");
  })
  .catch((err) => {
    console.log(err);
  });

const postRoute = require("./routes/post.route");
const authRoute = require("./routes/auth.route");
const userRoute = require("./routes/user.route");
const exchangeRoute = require("./routes/exchange.route");
const notificationRoute = require("./routes/notification.route");
const chatRoute = require("./routes/chat.route");
const apiUserRoute = require("./api/routes/user.route");

const authMiddleware = require("./middlewares/auth.middleware");
const adminMiddleware = require("./middlewares/admin.middleware");

const apiAdminRoute = require("./api/routes/admin.route");
const apiPostRoute = require("./api/routes/post.route");
const apiChatRoute = require("./api/routes/chat.route");
const apiNotificationRoute = require("./api/routes/notification.route");
const apiTourRoute = require("./api/routes/tour.route");
const apiBannerRoute = require("./api/routes/banner.route");
const apiBillRoute = require("./api/routes/bill.route");

app.get("/", (req, res) => {
  res.send("ok3 nka");
});

// socketio
const userOnline = {};

io.on("connection", (socket) => {
  console.log(`${socket.id} connected`);

  socket.on("user-posted", (data) => {
    io.sockets.emit("server-send-notifi-post", data);
  });

  socket.on("user-login", (data) => {
    socket.username = data.username;
    userOnline[socket.username] = socket;
  });

  socket.on("user-logout", (data) => {
    delete userOnline[socket.username];
  });

  socket.on("client-update-user", (data) => {
    socket.username = data;
    userOnline[socket.username] = socket;
  });

  socket.on("user-like", (data) => {
    io.sockets.emit("server-send-like", {
      post: data.post,
      index: data.index,
    });

    if (data.viewer in userOnline) {
      userOnline[data.viewer].emit(
        "server-send-notification",
        data.newNotifications
      );
    }
  });

  socket.on("user-comment", (data) => {
    io.sockets.emit("server-send-comment", {
      post: data.post,
      index: data.index,
    });

    if (data.viewer in userOnline) {
      userOnline[data.viewer].emit(
        "server-send-notification",
        data.newNotifications
      );
    }
  });

  socket.on("user-request-exchange", (data) => {
    if (data.viewer in userOnline) {
      userOnline[data.viewer].emit("server-exchange-data", data);
    }
  });

  socket.on("user-accept-exchange", (data) => {
    if (data.sender in userOnline) {
      userOnline[data.sender].emit("server-accept-exchange", data);
    }
  });

  socket.on("user-chat", (data) => {
    socket.broadcast.emit("server-send-chat", data);
  });

  socket.on("disconnect", () => {
    delete userOnline[socket.username];
    console.log(`${socket.id} was disconnected`);
  });
});

app.use("/auth", authRoute);
app.use("/posts", authMiddleware, postRoute);
app.use("/users", authMiddleware, userRoute);
app.use("/exchanges", exchangeRoute);
app.use("/notifications", authMiddleware, notificationRoute);
app.use("/chats", authMiddleware, chatRoute);

app.use("/api/tour", apiTourRoute);
app.use("/api/banner", apiBannerRoute);
app.use("/api/bill", apiBillRoute);
app.use("/api/admin", adminMiddleware, apiAdminRoute);
app.use("/api/chats", apiChatRoute);
app.use("/api/posts", apiPostRoute);
app.use("/api/notifications", apiNotificationRoute);
app.use("/api/users", apiUserRoute);

http.listen(PORT, () => {
  console.log(`Server has run on port ${PORT}`);
});
