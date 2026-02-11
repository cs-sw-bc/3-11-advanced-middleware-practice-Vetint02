import mongoose from 'mongoose';

const enrollmentSchema = new mongoose.Schema({
    studentName: {
        type: String,
        required: true,
        trim: true
    },
    courseName: {
        type: String,
        required: true
    },
    enrolledAt: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['enrolled', 'completed', 'dropped'],
        default: 'enrolled'
    }
});

const Enrollment = mongoose.model('Enrollment', enrollmentSchema);
export default Enrollment;