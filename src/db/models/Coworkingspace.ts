import mongoose from "mongoose";

const CoworkingspaceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name can not be more than 50 characters']
    },
    address: {
        type: String,
        required: [true, 'Please add an address']
    },
    district: {
        type: String,
        required: [true, 'Please add a district']
    },
    province: {
        type: String,
        required: [true, 'Please add a province']
    },
    tel: {
        type: String
    },
    openTime: {
        type: String,
        required: [true, 'Please add open time']
    },
    closeTime: {
        type: String,
        required: [true, 'Please add close time']
    },
    picture: {
        type: String,
        required: false
    }
});
const Coworkingspace = mongoose.models.Coworkingspace || mongoose.model("Coworkingspace",CoworkingspaceSchema);
export default Coworkingspace