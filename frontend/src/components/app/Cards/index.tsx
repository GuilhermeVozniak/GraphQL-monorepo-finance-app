import { useQuery } from "@apollo/client";
import Card from "../../../pages/Home/Card";
import { GET_TRANSACTIONS } from "../../../../graphql/queries/transactions.query";

const Cards = () => {
  const { data, loading, error } = useQuery(GET_TRANSACTIONS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data);
  return (
    <div className="w-full px-10 min-h-[40vh]">
      <p className="text-5xl font-bold text-center my-10">History</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
        {!loading &&
          data.transactions.map((transaction: any) => (
            <Card
              key={transaction._id}
              transaction={transaction}
              cardType={transaction.category}
            />
          ))}
      </div>
    </div>
  );
};
export default Cards;
