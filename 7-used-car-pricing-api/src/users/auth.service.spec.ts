import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { BadRequestException } from '@nestjs/common';

let service: AuthService;
let fakeUsersService: Partial<UsersService>;

describe('AuthService', () => {
  beforeEach(async () => {
    const users: User[] = [];
    fakeUsersService = {
      find: (email: string) => {
        const filteredUsers = users.filter((user) => user.email === email);
        return Promise.resolve(filteredUsers);
      },
      create: (email: string, password: string) => {
        const user = {
          id: Math.floor(Math.random() * 9999999),
          email,
          password,
        } as User;
        users.push(user);
        return Promise.resolve(user);
      },
    };

    const module = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: fakeUsersService,
        },
      ],
    }).compile();
    service = module.get(AuthService);
  });

  it('should create an instance of auth service', async () => {
    expect(service).toBeDefined();
  });

  it('should create a new user with a salted and hashed password', async () => {
    const email = 'test@test.com';
    const password = 'password';
    const user = await service.signup(email, password);

    expect(user.id).toBeDefined();
    expect(user.email).toBe(email);
    expect(user.password).not.toEqual(password);
    const [salt, hash] = user.password.split('.');
    expect(salt).toBeDefined();
    expect(hash).toBeDefined();
  });

  it('should throw an error if user signs up with an email that is in use', async () => {
    const email = 'test@test.com';
    const password = 'password';

    await service.signup(email, password);

    await expect(service.signup(email, password)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw an error if user tries to signin  with an unknown email', async () => {
    const email = 'test@test.com';
    const password = 'password';
    service.signup(email, password);

    await expect(service.signin('not@realmail.com', password)).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should throw an error if the password is incorrect', async () => {
    const email = 'test@test.com';
    const password = 'password';
    await service.signup(email, password);

    await expect(service.signin(email, 'Notpassword')).rejects.toThrow(
      BadRequestException,
    );
  });

  it('should return a user if correct password is provided', async () => {
    const email = 'test@test.com';
    const password = 'password';
    await service.signup(email, password);
    const user = await service.signin(email, password);
    expect(user).toBeDefined();
  });
});
