import { useMutation, useQuery } from "@apollo/client";
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import toast from "react-hot-toast";
import { MdLogout } from "react-icons/md";
import { LOGOUT } from "../../graphql/mutations/user.multation";
import GET_AUTHENTICATED_USER from "../../graphql/queries/user.query";
import TransactionForm from "./TransactionForm";
import TransactionsList from "./TransactionsList";

ChartJS.register(ArcElement, Tooltip, Legend);

const Home = () => {
  const chartData = {
    labels: ["Saving", "Expense", "Investment"],
    datasets: [
      {
        label: "%",
        data: [13, 8, 3],
        backgroundColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
        ],
        borderColor: [
          "rgba(75, 192, 192)",
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235, 1)",
        ],
        borderWidth: 1,
        borderRadius: 30,
        spacing: 10,
        cutout: 130,
      },
    ],
  };

  const {
    data: { authUser },
    error: getuserError,
  } = useQuery(GET_AUTHENTICATED_USER);
  if (getuserError) {
    console.error(getuserError);
    toast.error("An error occurred. Please try again");
  }

  const [logout, { loading, error }] = useMutation(LOGOUT, {
    refetchQueries: ["GetAutheticatedUser"],
  });
  if (error) {
    console.error("error", error);
    toast.error("An error occurred. Please try again");
  }
  const handleLogout = async () => {
    try {
      await logout();
      // clear the Apollo cache
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-6 items-center max-w-7xl mx-auto z-20 relative justify-center">
        <div className="flex items-center">
          <p className="md:text-4xl text-2xl lg:text-4xl font-bold text-center relative z-50 mb-4 mr-4 bg-gradient-to-r from-pink-600 via-indigo-500 to-pink-400 inline-block text-transparent bg-clip-text">
            Spend wisely, track wisely
          </p>
          <img
            src={
              authUser
                ? authUser?.profilePicture
                : "https://tecdn.b-cdn.net/img/new/avatars/2.webp"
            }
            className="w-11 h-11 rounded-full border cursor-pointer"
            alt="Avatar"
          />
          {!loading && (
            <MdLogout
              className="mx-2 w-5 h-5 cursor-pointer"
              onClick={handleLogout}
            />
          )}
          {/* loading spinner */}
          {loading && (
            <div className="w-6 h-6 border-t-2 border-b-2 mx-2 rounded-full animate-spin" />
          )}
        </div>
        <div className="flex flex-wrap w-full justify-center items-center gap-6">
          <div className="h-[330px] w-[330px] md:h-[360px] md:w-[360px]  ">
            <Doughnut data={chartData} />
          </div>

          <TransactionForm />
        </div>

        {/* List Tansactions */}
        <TransactionsList />
      </div>
    </>
  );
};
export default Home;
