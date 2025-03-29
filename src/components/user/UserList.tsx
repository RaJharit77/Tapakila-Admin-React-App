import { Avatar } from "@mui/material";
import {
  Datagrid,
  DateField,
  FunctionField,
  List,
  TextField,
} from "react-admin";

const AvatarField = ({ record }: { record?: any }) => {
  return (
    <Avatar
      src={record?.user_image}
      alt={record?.user_name}
      sx={{
        marginLeft: "20px",
        width: 40,
        height: 40,
        border: "2px solid #FFBA08",
        backgroundColor: "#0077FF",
        color: "white",
        fontWeight: "bold",
      }}
    />
  );
};

export const UserList = () => {
  return (
    <List
      pagination={false}
      exporter={false}
      sx={{
        "& .RaList-content": {
          boxShadow: "0px 2px 8px rgba(0, 119, 255, 0.1)",
        },
      }}
    >
      <Datagrid
        bulkActionButtons={false}
        sx={{
          "& .RaDatagrid-headerCell": {
            fontWeight: "bold",
            color: "#FFBA08",
          },
          "& .column-user_name": {
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
        <FunctionField render={(record) => <AvatarField record={record} />} />
        <TextField
          source="user_id"
          label="ID"
          sx={{fontWeight: "italic"}}
        />
        <TextField
          source="user_name"
          label="Nom"
          sx={{ color: "#0077FF", fontFamily: "Poppins", fontSize: "1rem" }}
        />
        <TextField
          source="user_email"
          label="Email"
          sx={{ fontFamily: "Poppins", fontSize: "1rem" }}
        />
        <DateField
          source="user_first_login_date"
          label="Date de création"
          showTime
          sx={{ color: "#0077FF", fontFamily: "Poppins", fontSize: "1rem"}}
        />
      </Datagrid>
    </List>
  );
};
