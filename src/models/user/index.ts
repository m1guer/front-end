export interface IUser {
	token: string;
	address: Address;
	last_login: string;
	username: string;
	email: string;
	is_active: boolean;
	phone: any;
	date_joined: string;
	is_trusty: boolean;
}
interface Address {
	street: string;
	cep: string;
	state: string;
	city: string;
	number: number;
	complement: string;
}
