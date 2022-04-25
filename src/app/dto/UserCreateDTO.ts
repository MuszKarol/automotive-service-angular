import {AddressDTO} from "./AddressDTO";
import {ContactDTO} from "./ContactDTO";

export interface UserCreateDTO {
  email: string;
  password: string;
  name: string;
  surname: string;
  role: string;
  address: AddressDTO;
  contactDetails: ContactDTO;
}

