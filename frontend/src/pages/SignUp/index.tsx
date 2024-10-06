import { useMutation, useQuery } from "@apollo/client";
import { useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "../../components/app/InputField";
import RadioButton from "../../components/app/RadioButton";
import { SIGN_UP } from "../../graphql/mutations/user.multation";
import GET_AUTHENTICATED_USER from "../../graphql/queries/user.query";

const SignUp = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [signUpData, setSignUpData] = useState({
    name: "",
    username: "",
    password: "",
    gender: "",
  });

  const [signup, { loading }] = useMutation(SIGN_UP, {
    refetchQueries: [{ query: GET_AUTHENTICATED_USER }],
  });
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!signUpData.name || !signUpData.username || !signUpData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      signup({
        variables: {
          input: signUpData,
        },
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }

    // if
    if (state && state.from) {
      // we make the previous location available to the login page so insede the login function we can redirect the user to the previous location
      navigate(state.from);
    }
  };

  const handleChange = (e: any) => {
    const { name, value, type } = e.target;

    if (type === "radio") {
      setSignUpData((prevData) => ({
        ...prevData,
        gender: value,
      }));
    } else {
      setSignUpData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // check if user is already authenticated
  const { data, error } = useQuery(GET_AUTHENTICATED_USER);
  if (error) {
    toast.error("An error occurred. Please try again later");
    console.log(error);
  }
  useLayoutEffect(() => {
    if (data?.authUser) {
      navigate(state?.from ? state.from : "/");
    }
  }, [data]);

  return (
    <div className="flex justify-center items-center">
      <div className="flex rounded-lg overflow-hidden z-50 bg-gray-300">
        <div className="w-full bg-gray-100 min-w-80 sm:min-w-96 flex items-center justify-center">
          <div className="max-w-md w-full p-6">
            <h1 className="text-3xl font-semibold mb-6 text-black text-center">
              Sign Up
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Join to keep track of your expenses
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <InputField
                label="Full Name"
                id="name"
                name="name"
                value={signUpData.name}
                onChange={handleChange}
              />
              <InputField
                label="Username"
                id="username"
                name="username"
                value={signUpData.username}
                onChange={handleChange}
              />

              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={signUpData.password}
                onChange={handleChange}
              />
              <div className="flex gap-10">
                <RadioButton
                  id="male"
                  label="Male"
                  // name='gender'
                  value="male"
                  onChange={handleChange}
                  checked={signUpData.gender === "male"}
                />
                <RadioButton
                  id="female"
                  label="Female"
                  // name='gender'
                  value="female"
                  onChange={handleChange}
                  checked={signUpData.gender === "female"}
                />
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={loading}
                >
                  {loading ? "loading..." : "Sign Up"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-black hover:underline">
                  Login here
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
