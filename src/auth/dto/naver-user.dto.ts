export class NaverUserDto {
  resultcode: '00' | string;
  message: 'success' | string;
  response: {
    email: string;
    id: string;
    nickname: string;
    profile_image?: string;
  };
}
