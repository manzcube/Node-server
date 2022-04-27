import mongoose from 'mongoose';
import { Schema, model } from 'mongoose';

const dataSchema = new Schema(
    {
        body: String,
    },
    {
        timestamps: true
    }
)

const Data = model('data', dataSchema)