import { Create, SimpleForm, TextInput, SelectInput, PasswordInput, required, email } from 'react-admin';

export const AdminCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="admin_name" label="Nom complet" validate={[required()]} fullWidth />
            <TextInput source="admin_mail" label="Email" validate={[required(), email()]} fullWidth />
            <PasswordInput source="admin_password" label="Mot de passe" validate={[required()]} fullWidth />
            <SelectInput 
                source="admin_role" 
                label="Rôle" 
                choices={[
                    { id: 'ADMIN', name: 'Administrateur' },
                    { id: 'SUPER_ADMIN', name: 'Super Administrateur' },
                ]} 
                defaultValue="ADMIN"
                validate={[required()]} 
                fullWidth 
            />
        </SimpleForm>
    </Create>
);