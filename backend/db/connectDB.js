import mongoose from "mongoose";
import util from "util";

/**
 * Connect to MongoDB
 * @returns {Promise<void>}
 */
export const connectDB = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // enable mongoose logging
    mongoose.set("debug", (collectionName, methodName, ...methodArgs) => {
      const msgMapper = (m) => {
        return util
          .inspect(m, false, 10, true)
          .replace(/\n/g, "")
          .replace(/\s{2,}/g, " ");
      };
      console.log(
        `\x1B[0;36mMongoose:\x1B[0m: ${collectionName}.${methodName}` +
          `(${methodArgs.map(msgMapper).join(", ")})`
      );
    });

    console.log("Connected to MongoDB\n");
  } catch (error) {
    console.error("Error connecting to MongoDB", error);
    throw new Error("Error connecting to MongoDB");
  }
};
