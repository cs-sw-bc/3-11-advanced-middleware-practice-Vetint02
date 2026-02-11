import express from 'express';
import Enrollment from '../models/enrollment.js'
import mongoose from 'mongoose'

const router = express.Router();

router.get('/', async (req, res, next) => {
    try {
        const enrollment = await Enrollment.find();
        res.json(enrollment);
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const enrollment = await Enrollment.findById(req.params.id);
        if(!enrollment)
        {
            const error = new Error("student not found");
            error.status = 404;
            next(error);
        }
        else {
            res.json(enrollment);
        }
    } catch (error) {
        next(error);
    }
});

export default router;