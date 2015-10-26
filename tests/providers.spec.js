// Import chai.
import chai from 'chai';
// import path from 'path';

chai.should();

describe('Describes something', () => {
  it('should pass', () => {
    const n = 10;

    n.should.equal(10);
  });
});