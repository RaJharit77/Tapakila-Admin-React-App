import { ArrayField, ChipField, Datagrid, FunctionField, NumberField, ReferenceField, TextField } from "react-admin";
import { Avatar, Typography } from "@mui/material";

const CustomEmpty = () => (
    <Typography>Cette utilisateur n'a pas encore acheter des tickets</Typography>
);


const TypeTicket = ({ ticketType }: { ticketType: string }) => {
  switch (ticketType) {
    case "VIP":
      return (
        <Typography
          sx={{ display: "flex", alignItems: "center", fontFamily: "Poppins" }}
        >
          <Avatar
            src="/iconCrown.png"
            sx={{ width: "20px", height: "20px", marginRight: "20px" }}
          />
          {ticketType}
        </Typography>
      );
    case "STANDARD":
      return (
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="/iconStandard.png"
            sx={{ width: "20px", height: "20px", marginRight: "20px" }}
          />
          {ticketType}
        </Typography>
      );
    case "EARLY_BIRD":
      return (
        <Typography sx={{ display: "flex", alignItems: "center" }}>
          <Avatar
            src="/iconTag.png"
            sx={{ width: "20px", height: "20px", marginRight: "20px" }}
          />
          {ticketType}
        </Typography>
      );
  }
};

export default function TicketUser() {
  return (
          <ArrayField source="tickets" label={""}>
            <Datagrid
              bulkActionButtons={false}
              rowClick={false}
              empty={<CustomEmpty />}
              sx={{
                padding: "20px 0",
                "& .RaList-content": {
                  boxShadow: "0px 2px 8px rgba(0, 119, 255, 0.1)",
                },
                "& .RaDatagrid-headerCell": {
                  fontWeight: "bold",
                  color: "#FFBA08",
                },
                "& .column-ticket_id": {
                  padding: "20px 10px",
                },
                "& .RaDatagrid-row": {
                  "&:hover": {
                    backgroundColor: "rgba(0, 119, 255, 0.05)",
                  },
                  "&:nth-of-type(even)": {
                    backgroundColor: "rgba(255, 186, 8, 0.05)",
                  },
                },
              }}
            >
              <TextField
                source="ticket_id"
                label="Numero"
                sx={{
                  color: "#0077FF",
                  fontFamily: "Poppins",
                  fontSize: "1.1rem",
                }}
              />
              <FunctionField
                label="Type"
                render={(record: any) => (
                  <TypeTicket ticketType={record.ticket_type} />
                )}
              />
              <ChipField label="Status" source="ticket_status" />
              <NumberField
                source="ticket_price"
                label="Prix"
                sx={{ fontFamily: "Poppins"}}
              />
              <ReferenceField reference="events" source="event_id" />
            </Datagrid>
          </ArrayField>
  )
}
