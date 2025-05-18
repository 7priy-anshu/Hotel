import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/hotel-booking`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Database connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
  }
};

export default connectDB;
