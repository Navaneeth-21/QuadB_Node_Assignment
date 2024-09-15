const express = require('express');
const bodyparser = require('body-parser');
const model = require('./models/cryptoModel');
const cors = require('cors');
const axios = require('axios');
const PORT = process.env.PORT || 4000;
require('dotenv').config();

const app = express();


app.use(cors());

app.use(bodyparser.json());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


//To fetch the data 
app.get('/fetch-crypto' , async(req,res)=>{
    try {
        const response = await axios.get('https://api.wazirx.com/api/v2/tickers');
        
        const tickers = Object.values(response.data).slice(0,10);
        
        tickers.forEach(ticker=>{
            model.create(ticker);
        });
        res.status(201).json({message:'Data fetched and stored successfully'});
        
    } catch (error) {
        res.status(500).json({message:'Internal Server Error'});
    }
});


// To get the data from the database
app.get('/get-crypto' , async (req,res) => {
    try {
        await model.find((err,results)=>{
            if(err){
                res.status(500).json('Error fetching the data');
            }else{
                res.json(results);
            }
        });
        
    } catch (error) {
        res.status(500).json('Internal server Error');
    }
});

app.use(express.static('public'));


app.listen(PORT , ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});