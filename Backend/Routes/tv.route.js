import express from 'express';
import {getTrendingTv,getTvTrailer, getTvDetails, getSimilarTvs, getTvsByCategory} from '../Controllers/tv.controller.js';
const router=express.Router();
router.get('/trending',getTrendingTv);
router.get('/:id/trailer',getTvTrailer);
router.get('/:id/details',getTvDetails);
router.get('/:id/similar',getSimilarTvs);
router.get('/:category',getTvsByCategory);
export default router;