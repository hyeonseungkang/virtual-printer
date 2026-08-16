import { HandledJob } from '../src';

describe('HandledJob', () => {
  it('should generate incrementing job-id based on existing jobs array length', () => {
    const existingJobs: HandledJob[] = [];
    const job1 = new HandledJob(existingJobs, 'Job 1', 'user1');
    expect(job1['job-id']).toBe(1);

    existingJobs.push(job1);
    const job2 = new HandledJob(existingJobs, 'Job 2', 'user2');
    expect(job2['job-id']).toBe(2);

    existingJobs.push(job2);
    const job3 = new HandledJob(existingJobs, 'Job 3', 'user3');
    expect(job3['job-id']).toBe(3);
  });

  it('should use provided jobName and requestingUserName', () => {
    const job = new HandledJob([], 'My Document', 'alice');
    expect(job['job-name']).toBe('My Document');
    expect(job['job-originating-user-name']).toBe('alice');
    expect(job['job-state']).toBe(9);
    expect(job.createdAt).toBeDefined();
    expect(typeof job.createdAt).toBe('number');
  });

  it('should fallback to defaults when jobName and requestingUserName are null', () => {
    const job = new HandledJob([], null, null);
    expect(job['job-name']).toMatch(/^job \d{4}-\d{2}-\d{2}T/);
    expect(job['job-originating-user-name']).toBe('anonymous');
    expect(job['job-state']).toBe(9);
  });
});
