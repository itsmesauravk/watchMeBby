// add for movies add / edit / delete
const Movie = require("./MoviesSchema.js")
const categories = require("./FeaturedMovies.js")


const addMovies = async(req,res)=>{
    try {
        const{movieName,IMDB_score,Released_year,Duration,Genre,cast,production} =req.body;
        const imagePath = req.file.path.replace(/\\/g, "/");

        const add = await Movie.create({
            movieName,
            IMDB_score,
            Released_year,
            Duration,
            Genre,
            cast,
            production,
            imagePath
        })
        if(!add){
            return res.status(404).json({success:false,message:"Unable to add movie"})
        }else{
            return res.status(200).json({success:true,message:"Movie added sucessfully"})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:"error",error})
    }
}

const getMovie = async(req,res)=>{
    try {
        const get = await Movie.find({})
        if(!get){
            return res.status(404).json({success:false,message:"Unable to get the movies"})
        }else{
            return res.status(200).json({success:true,get})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:"error",error})
    }
}

const delMovie = async(req,res)=>{
    try {
        const{movieId} = req.params;
        
        const del = await Movie.findByIdAndDelete({_id:movieId})
        if(!del){
            return res.status(404).json({success:false,message:"Unable to delete movie"})
        }else{
            return res.status(200).json({success:true,message:"Deleted sucessfully"})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:"error",error})
    }
}

const editMovie = async(req,res)=>{
    try {
        const{movieName,IMDB_score,Released_year,Duration,Genre,cast,production} = req.body;
        const {movieId} = req.params

        const update = await Movie.findByIdAndUpdate({_id:movieId},{
            movieName,
            IMDB_score,
            Released_year,
            Duration,
            Genre,
            cast,
            production
        }
        )
        if(!update){
            return res.status(404).json({success:false,message:"Unable to update movie"})
        }else{
            return res.status(200).json({success:true,message:"Edited sucessfuly"})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:"error",error})
    }
}

const getCategories = async(req,res)=>{
    try {
        const{category} = req.body;

        const get = await categories.find({category}).populate("Movie")
        if(!get){
            return res.status(404).json({success:false,message:"Unable to get the categories"})
        }else{
            return res.status(200).json({success:true, get})
        }
    } catch (error) {
        return res.status(400).json({success:false,message:"error",error})
    }
}


module.exports = {addMovies,getMovie,delMovie,editMovie}