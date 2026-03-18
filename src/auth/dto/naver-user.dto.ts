export interface NaverUserDto {
  message: 'success' | string;
  response: {
    email: string;
    id: string;
    nickname: string;
    profile_image?: string;
  };
  resultcode: '00' | string;
}
