const express = require('express');
const logger = require('morgan')
var https = require('https')
const fs = require('fs')
const httpHeader = require('./middlewares/httpHeader');
const checkToken = require('./middlewares/checkToken')
const connectDB = require('./config/db')
const loginRouter = require('./routes/login');
const questionnaireRouter = require('./routes/questionnaire');
const userRouter = require('./routes/user');


const app = express();
const port = process.env.PORT || 3000;
const port2 = process.env.PORT2 || 3001;
connectDB() // 连接数据库

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('*', httpHeader)
app.options('*', (_, res) => res.sendStatus(200))

app.use(checkToken)
app.use('/api', loginRouter)
app.use('/api', questionnaireRouter)
app.use('/api', userRouter)

// const options = {
//     cert: fs.readFileSync('./localhost.cert'),
//     key: fs.readFileSync('./localhost.key'),
// }
var server = https.createServer(options, app)

app.listen(port, () => {
    console.log(`HTTP Server is running on port ${port}`);
});
// server.listen(port2, () => {
//     console.log(`HTTPS Server is running on port ${port2}`);
// });
