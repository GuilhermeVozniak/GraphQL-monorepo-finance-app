import { useQuery } from "@apollo/client";
import { BsCardText } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaLocationDot, FaSackDollar } from "react-icons/fa6";
import { HiPencilAlt } from "react-icons/hi";
import { MdOutlinePayments } from "react-icons/md";
import { Link } from "react-router-dom";
import { GET_TRANSACTIONS } from "../../graphql/queries/transactions.query";
import { capitalize, formatDate } from "../../utils";

type Transaction = {
  _id: string;
  amount: number;
  category: string;
  description: string;
  location: string;
  paymentType: string;
  date: string;
};

const categoryColorMap = {
  saving: "from-green-700 to-green-400",
  expense: "from-pink-800 to-pink-600",
  investment: "from-blue-700 to-blue-400",
  // Add more categories and corresponding color classes as needed
};

const Transactions = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>

      {/* Cards */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading && data?.transactions?.length === 0 && (
          <p className="text-center text-lg text-gray-500">
            No transaction history found.
          </p>
        )}
        {!loading &&
          data?.transactions?.map((transaction: Transaction) => (
            <div
              key={transaction._id}
              className={`rounded-md p-4 bg-gradient-to-br ${
                categoryColorMap[
                  transaction?.category as keyof typeof categoryColorMap
                ]
              }`}
            >
              <div className="flex flex-col gap-3">
                <div className="flex flex-row items-center justify-between">
                  <h2 className="text-lg font-bold text-white">
                    {capitalize(transaction.category)}
                  </h2>
                  <div className="flex items-center gap-2">
                    <FaTrash className={"cursor-pointer"} />
                    <Link to={`/transaction/123`}>
                      <HiPencilAlt className="cursor-pointer" size={20} />
                    </Link>
                  </div>
                </div>
                <p className="text-white flex items-center gap-1">
                  <BsCardText />
                  Description: {transaction.description}
                </p>
                <p className="text-white flex items-center gap-1">
                  <MdOutlinePayments />
                  Payment Type: {transaction.paymentType.toUpperCase()}
                </p>
                <p className="text-white flex items-center gap-1">
                  <FaSackDollar />
                  Amount:{" "}
                  {transaction.amount.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </p>
                <p className="text-white flex items-center gap-1">
                  <FaLocationDot />
                  Location: {transaction.location}
                </p>
                <div className="flex justify-between items-center">
                  <p className="text-xs text-black font-bold">
                    {formatDate(transaction.date)}
                  </p>
                  <img
                    src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
                    className="h-8 w-8 border rounded-full"
                    alt=""
                  />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
export default Transactions;
