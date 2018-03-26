const express = require( 'express' );
const path = require( 'path' );
const app = express();

app.get( '/', ( req, res ) =>  res.sendFile(path.join(__dirname + '/dist/index.html')) );

app.listen( process.env.PORT || 4000, () => { console.log('App Started') } );
app.use( express.static( 'dist' ) );