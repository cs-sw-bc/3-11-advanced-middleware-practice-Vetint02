import express from 'express';
import Enrollment from '../models/enrollment.js'

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        const enrollment = await Enrollment.find();
        res.json(enrollment);
    } catch (error) {
        next(error);
    }
});

export default router;