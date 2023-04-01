import mongoose from "mongoose";

let isConnected = false;

export const connectToDB = async () => {
    mongoose.set('strictQuery', true);


    
    if (isConnected) {
        console.log("MongoDB is already connected");
        return;
    }

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "greenfitai",
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        isConnected = true

        console.log("MongoDB is connected");
    } catch (error) {
        console.log(error);
    }

    // const db = await mongoose.connect(process.env.MONGODB_URI, {
    //     useNewUrlParser: true,
    //     useUnifiedTopology: true,
    // });

    // isConnected = db.connections[0].readyState;
}