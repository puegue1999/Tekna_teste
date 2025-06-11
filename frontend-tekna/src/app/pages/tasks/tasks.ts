export interface Task {
  externalId: string,
  title: string;
  description: string;
  expirationAt: Date | string;
  finished: boolean;
}
