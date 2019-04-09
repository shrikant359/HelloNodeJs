const fs=require('fs');
var expr=require('express');
var hbs=require('hbs');

var app=expr();
const port=process.env.PORT||3000;
hbs.registerPartials(__dirname+'/views/partials')
app.set('View String','hbs');
app.use(expr.static(__dirname+'/public'));

app.use((req,res,next)=>{
	var now=new Date().toString();
	var log=`${now}:${req.method} ${req.url}`;
	console.log(log);
	fs.appendFile('server.log',log+'\n');
	next();
});
hbs.registerHelper('getCurrentYear',()=>{
	return new Date().getFullYear()
});
hbs.registerHelper('screamIt',(text)=>{
	return text.toUpperCase();
});


app.get('/',(req,res)=>{
res.render('home.hbs',{
	pageTitle:'Home Page',
	welcomeMessage:'Welcome to my website',
	currentYear:new Date().getFullYear()
     });
});

app.get('/about',(req,res)=>{
res.render('about.hbs',{
	pageTitle:'About Page',
	currentYear:new Date().getFullYear()
     });
});

/*app.listen(3000,()=>{
	console.log('server is upto on port 3000!');
});*/

app.listen(port,()=>{
	console.log('server is upto on port,{port}');
});