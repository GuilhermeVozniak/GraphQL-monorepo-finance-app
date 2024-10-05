import User from "../models/user.model.js";
import bcrypt from "bcrypt";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          throw new Error("Please fill in all fields");
        }

        const existignUser = await User.findOne({ username });
        if (existignUser) {
          throw new Error("User already exists");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const profilePicture = `https://avatar.iran.liara.run/public/${
          gender === "male" ? "boy" : "girl"
        }?username=${username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          profilePicture,
        });

        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (error) {
        console.error(error);
        throw new Error(error.message || "Internal server error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        if (!username || !password) {
          throw new Error("Please fill in all fields");
        }
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);
        return user;
      } catch (error) {
        console.error("Erro in login resolver", error);
        throw new Error(error.message || "Internal server error");
      }
    },
    logout: async (_, __, context) => {
      try {
        await context.logout();
        context.req.session.destroy((err) => {
          if (err) {
            console.log("Error in logout resolver", err);
            throw new Error("Internal server error");
          }
        });
        context.res.clearCookie("connect.sid");

        return { message: "Logged out successfully" };
      } catch (error) {
        console.error("Erro in login resolver", error);
        throw new Error(error.message || "Internal server error");
      }
    },
  },
  Query: {
    authUser: (_, __, context) => {
      try {
        return context.getUser();
      } catch (error) {
        console.error("Error in auth", err);
        throw new Error("Internal server error");
      }
    },
    user: async (_, { userId }) => {
      try {
        return await User.findById(userId);
      } catch (error) {
        console.error("Error in user resolver", error);
        throw new Error(err.message || "Internal server error");
      }
    },
  },
  // TODO: Add User transactions relation
};

export default userResolver;
