import { echoTest } from './echo-test';

describe('echoTest', () => {
  it('should work', () => {
    expect(echoTest()).toEqual('echo-test');
  });
});
