export interface CompleteProfileRequest {
  uuid: string;
  name: string;
  nickname: string;
  email?: string;
  phone?: string;
  address?: string;
  addressDetail?: string;
  zipcode?: string;
  bio?: string;
  profileUrl?: string;
  birthDate?: string;

}
export interface FieldErrors {
    name?: string;
    nickname?: string;
    email?: string;
    phone?: string;
    zipcode?: string;
    birthDate?: string;
}