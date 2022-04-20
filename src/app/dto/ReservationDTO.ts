export interface ReservationDTO {
  faultDetails: string;
  bookingDate: Date;
  acceptationDate: Date;
  expectedStartServiceDate: Date;
  expectedEndServiceDate: Date;
  clientEmail: string;
  mechanicEmail: string;
  vinCode: string;
}
