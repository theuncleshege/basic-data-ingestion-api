import { getDbOptions } from '@DBConnections/DynamoDB/DynamoDBConnection';

describe('DynamoDBConnection Tests', () => {
  it('should return correct testing db config', () => {
    const options = getDbOptions();

    expect(options).toMatchObject({
      endpoint: 'localhost:8000',
      region: 'local-env',
      sslEnabled: false,
    });
  });

  it('should return correct offline db config', () => {
    const jestWotkerId = process.env.JEST_WORKER_ID;
    process.env.JEST_WORKER_ID = '';
    process.env.IS_OFFLINE = 'true';

    const options = getDbOptions();

    expect(options).toMatchObject({
      endpoint: 'http://localhost:8000',
      region: 'localhost',
    });

    process.env.IS_OFFLINE = '';
    process.env.JEST_WORKER_ID = jestWotkerId;
  });

  it('should return empty db config', () => {
    const jestWotkerId = process.env.JEST_WORKER_ID;
    const nodeEnv = process.env.NODE_ENV;
    process.env.JEST_WORKER_ID = '';
    process.env.NODE_ENV = 'production';

    const options = getDbOptions();

    expect(options).toMatchObject({});

    process.env.JEST_WORKER_ID = jestWotkerId;
    process.env.NODE_ENV = nodeEnv;
  });
});
