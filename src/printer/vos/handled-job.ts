export class HandledJob {
  constructor(
    handledJobs: HandledJob[],
    jobName: string | null,
    jobOriginatingUserName: string | null,
  ) {
    this['job-id'] = handledJobs.length + 1;
    this['job-name'] = jobName || 'job ' + new Date().toISOString();
    this['job-originating-user-name'] = jobOriginatingUserName || 'anonymous';
  }
  public readonly 'job-id': number;
  public readonly 'job-state' = 9;
  public readonly 'job-name';
  public readonly 'job-originating-user-name': string;
  public readonly createdAt = Date.now();
}
