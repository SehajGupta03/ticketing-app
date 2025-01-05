const { default: TicketForm } = require("@/app/[components]/TicketForm");

const getTicketById = async (id) => {
  const res = await fetch(`http://localhost:3000/api/Tickets/${id}`, {
    cache: "no-store",
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch ticket");
  }
  return res.json();
};

const TicketPage = async ({ params }) => {
  const EDITMODE = params.id === "new" ? false : true;
  let updateTicketData = {};

  if (EDITMODE) {
    updateTicketData = await getTicketById(params.id);
    updateTicketData = updateTicketData.ticket;
  }
  else {
    updateTicketData = {
      _id: "new"
    }
  }
  return <TicketForm ticket={updateTicketData} />;
};

export default TicketPage;
