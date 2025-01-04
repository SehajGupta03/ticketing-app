import TicketCard from "./[components]/TicketCard";

const getTickets = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/Tickets", {
      cache: "no-store",
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

const Dashboard = async () => {
  const { tickets } = await getTickets();
  const uniqueCategories = [
    ...new Set(tickets?.map((ticket) => ticket.category)),
  ];

  return (
    <div className="p-5">
      <div>
        {tickets &&
          uniqueCategories.map((category, categoryIndex) => (
            <div className="mb-4" key={categoryIndex}>
              <h2>{category}</h2>
              <div className="lg:grid grid-cols-2 xl:grid-cols-4">
                {tickets.filter((ticket) => ticket.category === category).map((filteredTicket, _index) => (
                  <TicketCard id={_index} key={_index} ticket={filteredTicket} />
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Dashboard;
