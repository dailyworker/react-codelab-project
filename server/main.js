import WebpackDevserver from 'webpack-dev-server';
import webpack from 'webpack';
import express from 'express';
import morgan  from 'morgan';
import bodyParser from 'body-parser';
import session from 'express-session';
import api  from './routes';
import path from 'path';

const app     = express();
const port    = 3000;
const devPort = 4000;


app.use('/', express.static(path.join(__dirname, './../public')));

app.get('/hello', (req, res) => {
    return res.send('Hello Express.js');
})

app.listen(port, () => {
    console.log('Express is listening on port', port);
})

app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));

app.use(morgan('dec'));
app.use(bodyParser.json());
app.use('/api', api);


if(process.env.NODE_ENV == 'development'){
    console.log('Server is running on development mode');
    const config    = require('../webpack.config');
    const complier  = webpack(config);
    const devServer = new WebpackDevserver(complier, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listening on port', devPort);
        }
    )
}
