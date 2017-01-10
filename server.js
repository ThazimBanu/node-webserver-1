const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname+ '/views/partials')
app.set('view engine','hbs');
app.use(express.static(__dirname+ '/public'));

app.use((req,resp,next)=>{
 var now = new Date().toString();
 var log = `${now}:${req.methos}${req.url}`;
 console.log(log);
 fs.appendFile('server.log',log+'\n');
 next();
});

hbs.registerHelper('getCurrentYear',()=>{
 return new Date().getFullYear();
});

// hbs.registerHelper('screamIt', (text)=>{
//  return text.toUpperCase();
// });

app.get('/',(request,response)=>{
response.render('home.hbs',{
    pagetTitle: 'Welcome to my website',
});
});

app.get('/about',(request,response)=>{
    response.render('about.hbs',{
        pagetTitle: 'About Page',
    });
});

app.get('/projects',(req,res) => {
 res.render('projects.hbs',{
     pagetTitle: 'Projects',
 });
});

app.get('/bad',(request,response)=>{
 response.send({
     errorMessage: 'Unable to handle request'
 });
});

app.listen(port,() => {
    console.log(`Server is up on port ${port}`);
});