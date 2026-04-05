import { render, screen } from '@testing-library/react';

import { Select } from './Select';

jest.mock('@/shared/assets', () => {
  const { createElement } = jest.requireActual<typeof import('react')>('react');
  return {
    ArrowCloseIcon: () =>
      createElement('span', { 'data-testid': 'arrow-close-icon' }),
    ArrowOpenIcon: () =>
      createElement('span', { 'data-testid': 'arrow-open-icon' })
  };
});

const options = [
  { label: 'Rick', value: 'rick' },
  { label: 'Morty', value: 'morty' }
];

describe('Select', () => {
  it('вариант по умолчанию: компонент Select и кнопка без модификаторов small', () => {
    const { container } = render(
      <Select
        options={options}
        placeholder='Pick one'
      />
    );

    const root = container.firstElementChild;
    expect(root).toHaveClass('select');
    expect(root).not.toHaveClass('select_small');

    const button = screen.getByRole('button');
    expect(button).toHaveClass('select__button');
    expect(button).not.toHaveClass('select__button_small');
  });

  it('вариант small: классы select_small и select__button_small', () => {
    const { container } = render(
      <Select
        options={options}
        variant='small'
        placeholder='Pick one'
      />
    );

    const root = container.firstElementChild;
    expect(root).toHaveClass('select', 'select_small');

    const button = screen.getByRole('button');
    expect(button).toHaveClass('select__button', 'select__button_small');
    expect(button.querySelector('.select__button-inner')).toBeInTheDocument();
  });

  it('placeholder отображается в кнопке для варианта по умолчанию', () => {
    const placeholder = 'Choose character';

    render(
      <Select
        options={options}
        placeholder={placeholder}
      />
    );

    const button = screen.getByRole('button');
    expect(button).toHaveTextContent(placeholder);
    expect(button).not.toHaveClass('select__button_small');
  });
});
