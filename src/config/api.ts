import { registerAs } from '@nestjs/config';

export default registerAs('api', () => {
  return {
    mock_api: process.env.MOCK_API,
  };
});
