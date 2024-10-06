import Transaction from "../models/trasaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if (!context.getUser()) {
          throw new Error("Unauthorized");
        }
        const userId = context.getUser()._id;
        const trasactions = await Transaction.find({ userId });
        return trasactions;
      } catch (error) {
        console.error("Error in trasactions resolver", error);
        throw new Error(error.message || "Error getting trasactions");
      }
    },
    transaction: async (_, { transactionId }, context) => {
      try {
        if (!context.getUser()) {
          throw new Error("Unauthorized");
        }
        const userId = context.getUser()._id;
        const trasaction = await Transaction.findOne({
          _id: transactionId,
          userId,
        });
        return trasaction;
      } catch (error) {
        console.error("Error in trasaction resolver", error);
        throw new Error(error.message || "Error getting trasaction");
      }
    },
    // TODO: Add categoryStatistics query
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (error) {
        console.error("Error in createTransaction resolver", error);
        throw new Error(error.message || "Error creating trasaction");
      }
    },
    updateTransaction: async (_, { input }, context) => {
      try {
        return await Transaction.findOneAndUpdate(input.transactionId, input, {
          new: true,
        });
      } catch (error) {
        console.error("Error in updateTransaction resolver", error);
        throw new Error(error.message || "Error updating trasaction");
      }
    },
    deleteTransaction: async (_, { transactionId }, context) => {
      try {
        return await Transaction.findOneAndDelete({ _id: transactionId });
      } catch (error) {
        console.error("Error in deleteTransaction resolver", error);
        throw new Error(error.message || "Error deleting trasaction");
      }
    },
    // TODO: add trasaction/user relation
  },
};

export default transactionResolver;
