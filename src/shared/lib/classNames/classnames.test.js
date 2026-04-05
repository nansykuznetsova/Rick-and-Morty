import { classNames } from './classNames';

describe('classNames', () => {
  it('возвращает строку из одного класса', () => {
    expect(classNames('foo')).toBe('foo');
  });

  it('объединяет несколько классов', () => {
    expect(classNames('foo', 'bar', 'baz')).toBe('foo bar baz');
  });

  it('игнорирует falsy значения', () => {
    expect(classNames('a', false, null, undefined, '', 'b')).toBe('a b');
  });

  it('возвращает пустую строку, если аргументов нет', () => {
    expect(classNames()).toBe('');
  });
});
