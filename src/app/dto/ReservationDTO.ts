export interface ReservationDTO {
  faultDetails: string;
  carDeliveryDate: Date;
  acceptationDate: Date;
  expectedStartServiceDate: Date;
  expectedEndServiceDate: Date;
  clientEmail: string;
  mechanicEmail: string;
  vinCode: string;
}