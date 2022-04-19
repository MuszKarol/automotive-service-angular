import {MechanicalServiceDTO} from "./MechanicalServiceDTO";
import {AddressDTO} from "./AddressDTO";
import {DayDTO} from "./DayDTO";

export interface CompanyDetailsDTO {
  id: string
  automotiveServiceName: string
  description: string
  phoneNumber: string
  listOfMechanicalServices: MechanicalServiceDTO[]
  address: AddressDTO
  listOfOperatingHours: DayDTO[]
}
