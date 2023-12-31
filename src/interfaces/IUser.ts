// {
//     userId: '726c06ad-65c2-41ae-8c6f-55db260f4cf5',
//     role: 'admin',
//     name: 'Md Mahafujur Rahaman Masud',
//     email: 'admin@admin.com',
//     iat: 1704018539,
//     exp: 1735554539
//   }

export interface IUser {
  userId?: string;
  role?: string;
  name?: string;
  email?: string;
  iat?: number;
  exp?: number;
}