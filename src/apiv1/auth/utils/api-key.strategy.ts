import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
// import { ConfigService } from '@nestjs/config';
// import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

// @Injectable()
// export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
//     constructor(private authService: AuthService) {
  
//       super({ header: 'api-key', prefix: '' }, true, async (apiKey, done) => {
//         if (this.authService.validateApiKey(apiKey)) {
//           done(null, true);
//         }
//         done(new UnauthorizedException(), null);
//       });
//     }
//   }