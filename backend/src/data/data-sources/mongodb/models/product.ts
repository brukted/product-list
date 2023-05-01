
import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
    title: string;
    price: number;
    description: string;
    brand: string;
    material: string;
    color: string
    bannerImage: string;
    rating: number;
}

const ProductSchema: Schema = new Schema({
    title: { type: String, required: true, minlength: 10 },
    price: { type: Number, required: true },
    description: { type: String, required: true, minlength: 30 },
    brand: { type: String, required: true, minlength: 3 },
    material: { type: String, required: true, minlength: 3 },
    color: { type: String, required: true, minlength: 3 },
    // validate to be with regex
    bannerImage: {
        type: String, required: true, validate: {
            validator: function (v: string) {
                return /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/gm.test(v);
            },
            message: (props: { value: any; }) => `${props.value} is not a valid url!`
        }
    },
    rating: { type: Number, required: false, default: Math.floor(Math.random() * 5) + 1 }
});

export const ProductModel = mongoose.model<IProduct>('Product', ProductSchema);