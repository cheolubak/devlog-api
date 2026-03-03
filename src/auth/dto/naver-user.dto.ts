export class NaverUserDto {
  resultcode: '00' | string;
  message: 'success' | string;
  response: {
    id: string;
    nickname: string;
    email: string;
    profile_image?: string;
  }
}