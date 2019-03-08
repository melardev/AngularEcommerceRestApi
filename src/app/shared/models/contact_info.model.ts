export class ContactInfo {
  constructor(obj: any) {
    if (typeof obj === 'object') {
      this.firstName = obj.first_name;
      this.lastName = obj.last_name;
      this.email = obj.email;
      this.address = obj.address;
      this.country = obj.country;
      this.zipCode = obj.zip_code;
      this.city = obj.city;
      this.cardNumber = obj.cardNumber;
    }
  }

  firstName: string;
  lastName: string;
  email: string;
  address: string;
  country: string;
  city: string;
  zipCode: string;
  cardNumber: string;
}
