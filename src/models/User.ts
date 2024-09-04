export default interface User {
  name: string;
  username: string;
  email: string;
  phone: string;
  id: number;
  website?: string;
  adress?: {
    city: string;
    geo?: { lat: string; lng: string };
    street?: string;
    suite?: string;
    zipcode?: string;
  };
  company?: { name: string; bs?: string; catchPhrase?: string };
}
