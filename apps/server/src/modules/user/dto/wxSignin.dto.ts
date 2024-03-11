// src/User/dto/login.dto.ts


export class WXSignInDto {
  readonly iv: string;

  readonly encryptedData: string;

  
  readonly code: string;
}

