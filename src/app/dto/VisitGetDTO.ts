export interface VisitGetDTO {
  id: string;
  faultDetails: string;
  carDeliveryDate: Date;
  acceptationDate: Date;
  expectedStartServiceDate: Date;
  expectedEndServiceDate: Date;
  clientEmail: string;
  clientPhoneNumber: string;
  serviceStatus: string;
  brandName: string;
  modelName: string;
  version: string;
  engine: string;
  vinCode: string;
  licensePlateNumbers: string;
  carRegistrationDate: Date;
}
