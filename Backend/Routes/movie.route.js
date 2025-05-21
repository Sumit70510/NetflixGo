import express from 'express';
import {getTrendingMovie,getMovieTrailer, getMovieDetails, getSimilarMovies, getMoviesByCategory} from '../Controllers/movie.controller.js';
const router=express.Router();
router.get('/trending',getTrendingMovie);
router.get('/:id/trailer',getMovieTrailer);
router.get('/:id/details',getMovieDetails);
router.get('/:id/similar',getSimilarMovies);
router.get('/:category',getMoviesByCategory);
export default router;
