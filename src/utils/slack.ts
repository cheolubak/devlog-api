import { WebClient } from '@slack/web-api';

export const slackApi = (token: string) => new WebClient(token);
