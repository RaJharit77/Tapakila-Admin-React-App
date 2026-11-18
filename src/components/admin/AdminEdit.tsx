import { Edit, SimpleForm, TextInput, SelectInput, PasswordInput, required, email } from 'react-admin';

export const AdminEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="admin_name" label="Nom complet" validate={[required()]} fullWidth />
            <TextInput source="admin_mail" label="Email" validate={[required(), email()]} fullWidth />
            <PasswordInput 
                source="admin_password" 
                label="Nouveau mot de passe (laisser vide pour ne pas modifier)" 
                fullWidth 
            />
            <SelectInput 
                source="admin_role" 
                label="Rôle" 
                choices={[
                    { id: 'ADMIN', name: 'Administrateur' },
                    { id: 'SUPER_ADMIN', name: 'Super Administrateur' },
                ]} 
                validate={[required()]} 
                fullWidth 
            />
        </SimpleForm>
    </Edit>
);