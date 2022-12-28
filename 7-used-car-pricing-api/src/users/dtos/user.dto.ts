import { Expose } from 'class-transformer';

export class UserDTO {
  @Expose()
  public id: number;

  @Expose()
  public email: string;
}
