import {AddressDTO} from "./AddressDTO";
import {ContactDTO} from "./ContactDTO";
import {CarDTO} from "./CarDTO";

export interface UserGetDTO {
  userId: string;
  email: string;
  name: string;
  surname: string;
  role: string;
  address: AddressDTO;
  contactDetails: ContactDTO;
  carDTOList: CarDTO[];
}
