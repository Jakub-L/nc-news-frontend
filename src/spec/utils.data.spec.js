import * as data from '../utils/data';

describe('convertArticleDate', () => {
  it('Returns empty string if given empty or undefined date', () => {
    expect(data.convertArticleDate('')).toBe('');
    expect(data.convertArticleDate()).toBe('');
  });
  it('Returns empty string if given date of wrong format', () => {
    expect(data.convertArticleDate('2018-04-16 @ 12:00:00')).toBe('');
    expect(data.convertArticleDate('2018-04-16 @ 12:00.00')).toBe('');
    expect(data.convertArticleDate('April 16, 2018 at 12:00:00')).toBe('');
  });
  it('Converts date correctly', () => {
    expect(data.convertArticleDate('2018-05-30T15:59:13.341Z')).toBe(
      '2018-05-30 at 15:59'
    );
    expect(data.convertArticleDate('2018-05-06T02:40:35.489Z')).toBe(
      '2018-05-06 at 02:40'
    );
    expect(data.convertArticleDate('2018-04-16T19:29:32.774Z')).toBe(
      '2018-04-16 at 19:29'
    );
    expect(data.convertArticleDate('2018-03-28T03:03:58.717Z')).toBe(
      '2018-03-28 at 03:03'
    );
  });
  it('Accepts various formats of data', () => {
    expect(data.convertArticleDate('April 16, 2018T12:00:00.000Z')).toBe(
      'April 16, 2018 at 12:00'
    );
    expect(data.convertArticleDate('May 13, 2018T12:00:00')).toBe(
      'May 13, 2018 at 12:00'
    );
  });
});
