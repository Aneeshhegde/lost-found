const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    // Support both MONGO_URI and mongoURI for backward compatibility
    const mongoURI = process.env.MONGO_URI || process.env.mongoURI;
    
    if (!mongoURI) {
      console.error("ERROR: MONGO_URI or mongoURI environment variable is not set!");
      console.error("Please check your .env file");
      process.exit(1);
    }
    
    console.log("Connecting to MongoDB...");
    
    await mongoose.connect(mongoURI);

    console.log("MongoDB Connected Successfully!");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;