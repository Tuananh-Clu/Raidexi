export interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    icon?: string;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'outline';
    icon?: string;
    fullWidth?: boolean;
}
export interface InputGroupProps {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface UserData {
    id: string;
    name: string;
    email: string;
    hashPassword: string;
    createdAt: string;
}

export interface LoginParams {
    email: string;
    password: string;
}

export interface RegisterParams {
    email: string;
    password: string;
    fullname: string;
}
