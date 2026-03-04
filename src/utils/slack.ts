import { WebClient } from '@slack/web-api';

console.log('=======process.env.SLACK_TOKEN=======', process.env.SLACK_TOKEN);

export const slackApi = (token: string) => new WebClient(token);
