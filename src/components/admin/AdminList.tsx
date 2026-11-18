import { List, Datagrid, TextField, EditButton, DeleteButton, CreateButton, TopToolbar, SearchInput } from 'react-admin';
import { Chip } from '@mui/material';

const adminFilters = [
    <SearchInput source="q" alwaysOn />,
];

const AdminActions = () => (
    <TopToolbar>
        <CreateButton />
    </TopToolbar>
);

export const AdminList = () => (
    <List filters={adminFilters} actions={<AdminActions />}>
        <Datagrid rowClick="edit">
            <TextField source="admin_id" label="ID" />
            <TextField source="admin_name" label="Nom complet" />
            <TextField source="admin_mail" label="Email" />
            <TextField 
                source="admin_role" 
                label="Rôle" 
                render={(record) => (
                    <Chip 
                        label={record?.admin_role} 
                        color={record?.admin_role === 'SUPER_ADMIN' ? 'error' : 'primary'} 
                        size="small" 
                    />
                )} 
            />
            <EditButton />
            <DeleteButton />
        </Datagrid>
    </List>
);