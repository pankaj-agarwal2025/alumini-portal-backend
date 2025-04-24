require("dotenv").config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const cloudinary=require('cloudinary').v2
const PORT = process.env.PORT || 5000;

// Imports
const authRouter = require('./routes/auth.routes');
const alumiRouter = require('./routes/alumni.route');
const facultyRouter = require('./routes/faculty.route');
const eventRouter=require('./routes/event.route');
const certificateRouter=require('./routes/certificate.route');
const adminRouter=require('./routes/admin.route');
const jobRouter=require('./routes/jobOpportunity.route');
const postRouter=require('./routes/post.route');

cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME, 
        api_key: process.env.API_KEY, 
        api_secret: process.env.API_SECRET
    });

app.use(express.static('public')); 
app.use(express.json());
app.use(cors({
  origin: "https://alumni.soet-krmu.com/",
  credentials: true // if you're using cookies or auth headers
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://alumni.soet-krmu.com/");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/v1/api/auth', authRouter);
app.use('/v1/api/alumni',alumiRouter);
app.use('/v1/api/faculty',facultyRouter);
app.use('/v1/api/event',eventRouter);
app.use('/v1/api/certificate',certificateRouter)
app.use('/v1/api/admin-profile',adminRouter)
app.use('/v1/api/job',jobRouter)
app.use('/v1/api/post',postRouter)

app.get('/', async (req, res) => {
  res.send('Welcome to the Express Server!');
});

app.use((req, res) => {
  res.status(404).send('404 - Page Not Found');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});