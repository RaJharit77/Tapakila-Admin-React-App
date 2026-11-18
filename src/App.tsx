
import { Admin, Resource } from "react-admin";
import { authProvider } from "./auth/auth-provider";
import { LoginPage } from "./screen/LoginPage";
import { UserList } from "./components/user/UserList";
import { EventList } from "./components/events/EventsList";
import { EventShow } from "./components/events/EventShow";
import { EventEdit } from "./components/events/EventEdit";
import { EventCreate } from "./components/events/EventCreate";
import { People, Event, Message } from "@mui/icons-material";
import { compositeDataProvider } from "./data/compositeDataProvider";
import { Layout } from "./Layout";
import { UserShow } from "./components/user/UserShow";
import MessageList from "./components/message/MessageList";
import { AdminPanelSettings } from "@mui/icons-material";
import { AdminList } from "./components/admin/AdminList";
import { AdminCreate } from "./components/admin/AdminCreate";
import { AdminEdit } from "./components/admin/AdminEdit";

export const App = () => {
  return (
    <Admin
      authProvider={authProvider}
      loginPage={LoginPage}
      dataProvider={compositeDataProvider}
      layout={Layout}
    >
      <Resource
        name="users"
        list={UserList}
        show={UserShow}
        icon={People}
      />

      <Resource
        name="events"
        list={EventList}
        show={EventShow}
        edit={EventEdit}
        create={EventCreate}
        icon={Event}
      />

      <Resource
        name="contact"
        list={MessageList}
        icon={Message}
      />

      <Resource
        name="admins"
        list={AdminList}
        create={AdminCreate}
        edit={AdminEdit}
        icon={AdminPanelSettings}
      />
    </Admin>
  );
};

export default App;