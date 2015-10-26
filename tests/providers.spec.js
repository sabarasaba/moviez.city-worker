import Providers from '../providers';
import { expect } from 'chai';


describe('Providers', () => {

  describe('PirateBay', () => {
    let data;

    before((done) => {
      Providers.PirateBay.Process().then((fetched) => {
        data = fetched;
      }).catch(err => {
        data = undefined;
      }).then(() => {
        done();
      });
    });

    it('shouldnt have failed', () => {
      expect(data).to.not.be.undefined;
    });

    it('should have gotten data from provider', () => {
      expect(data.length).to.be.above(0);
    });
  });

  describe('1337x', () => {
    let data;

    before((done) => {
      Providers.LeetX.Process().then((fetched) => {
        data = fetched;
      }).catch(err => {
        data = undefined;
      }).then(() => {
        done();
      });
    });

    it('shouldnt have failed', () => {
      expect(data).to.not.be.undefined;
    });

    it('should have gotten data from provider', () => {
      expect(data.length).to.be.above(0);
    });
  });
});