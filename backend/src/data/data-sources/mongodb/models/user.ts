
import mongoose, { Schema, Document } from 'mongoose';
import bcrypt from 'bcrypt';

export interface IUser extends Document {
    username: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true, minlength: 3 },
    password: { type: String, require: true, minlength: 8 }
});

UserSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    next();
});

export const UserModel = mongoose.model<IUser>('User', UserSchema);