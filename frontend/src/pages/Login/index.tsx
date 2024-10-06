import { useMutation, useQuery } from "@apollo/client";
import { useLayoutEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputField from "../../components/app/InputField";
import { LOGIN } from "../../graphql/mutations/user.multation";
import GET_AUTHENTICATED_USER from "../../graphql/queries/user.query";

const LoginPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [login, { loading }] = useMutation(LOGIN, {
    refetchQueries: [{ query: GET_AUTHENTICATED_USER }],
  });
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginData.username || !loginData.password) {
      toast.error("All fields are required");
      return;
    }

    try {
      await login({
        variables: {
          input: loginData,
        },
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error.message);
    }

    // force user to login before accessing protected routes
    if (state && state.from) {
      // we make the previous location available to the login page so insede the login function we can redirect the user to the previous location
      navigate(state.from);
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
              Login
            </h1>
            <h1 className="text-sm font-semibold mb-6 text-gray-500 text-center">
              Welcome back! Log in to your account
            </h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <InputField
                label="Username"
                id="username"
                name="username"
                value={loginData.username}
                onChange={handleChange}
              />

              <InputField
                label="Password"
                id="password"
                name="password"
                type="password"
                value={loginData.password}
                onChange={handleChange}
              />
              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white p-2 rounded-md hover:bg-gray-800 focus:outline-none focus:bg-black  focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 transition-colors duration-300
										disabled:opacity-50 disabled:cursor-not-allowed
									"
                  disabled={loading}
                >
                  {loading ? "loading..." : "Login"}
                </button>
              </div>
            </form>
            <div className="mt-4 text-sm text-gray-600 text-center">
              <p>
                {"Don't"} have an account?{" "}
                <Link to="/signup" className="text-black hover:underline">
                  Sign Up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
