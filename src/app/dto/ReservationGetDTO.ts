export interface ReservationGetDTO {
  id: string;
  faultDetails: string;
  carDeliveryDate: Date;
  acceptationDate: Date;
  expectedStartServiceDate: Date;
  expectedEndServiceDate: Date;
  clientEmail: string;
  clientPhoneNumber: string;
  serviceStatus: string;
  mechanicEmail: string;
  brandName: string;
  modelName: string;
  vinCode: string;
}
