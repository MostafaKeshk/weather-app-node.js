const geocode =require('./utils/geocode')
const forecast =require('./utils/forecast')
const path = require('path');
const express = require('express');
const hbs = require('hbs');
const app = express();
const port = process.env.PORT || 3000;


app.set('view engine','hbs');
app.set('views',path.join(__dirname,'../templates/views'))
hbs.registerPartials(path.join(__dirname,'../templates/partials'))

app.use(express.static(path.join(__dirname,'../public')))
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'about'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title: 'help'
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: 'help article not found'
    })
})

app.get('/weather',(req,res)=>{
    const address = req.query.address;
if(!address){
    return res.send({
        error:'please provide a location'
    })
}else{
    geocode(address,(error,data)=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(data.latitude,data.longitude,(error,forecastData)=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                location:data.location,
                forecastData
            })
        })
    })
    
}

});




app.get('*',(req,res)=>{
res.render('404',{
    title:'404 page'
})
})

app.listen(port,()=>{
    console.log('live server on port ' + port)
})