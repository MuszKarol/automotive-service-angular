export interface ReservationPatchDTO {
  id: string;
  serviceStatus: string;
  expectedStartServiceDate: Date;
  expectedEndServiceDate: Date;
  mechanicEmail: string;
}
