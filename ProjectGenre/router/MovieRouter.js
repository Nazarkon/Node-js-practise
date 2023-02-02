const { Router } = require('express');
const Joi = require('joi');

const schema = Joi.object({
    name: Joi.string()
    .max(10)
    .min(5)
    .required(),
    type: Joi.string()
    .max(10)
    .min(5)
    .required(),
    id: Joi.number()
    .integer(),
})

const {  getAllMovie,
    getMovieById,
    deleteMovieById,
    addMovie } = require('../controller/MovieContoller');

const router = Router();

router.get('/api/movie', (req,res) => {
    const result  = getAllMovie();
    res.send(result).status(200);
})

router.get('/api/movie/:id', (req,res) => {
    const result = getMovieById(req.params.id);
    res.send(result);
})

router.post(`/api/movie`, (req,res) => {
    const { error, value } = schema.validate(req.body);
    console.log(error)
    if(error) return res.send(error.details[0].message).status(400)
    const result = addMovie(req.body);
    res.send(result).status(201);
})

router.delete(`/api/movie/:id`, (req,res) => {
    const result = deleteMovieById(req.params.id)
    res.send(result).status(201);
})

module.exports = router;