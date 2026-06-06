import type { Meta, StoryObj } from '@storybook/react';

import { Input } from './Input';

const meta: Meta<typeof Input> = {
  title: 'Shared/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['filter', 'form'] },
    size: { control: 'radio', options: ['small', 'big'] },
    name: { control: 'text' },
    placeholder: { control: 'text' },
    value: { control: 'text' },
    onChange: { control: false },
    className: { control: false }
  }
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Underlined: Story = {
  args: {
    variant: 'form',
    size: 'big',
    name: 'underlined-input',
    placeholder: 'Enter character name'
  },
  parameters: {
    docs: {
      description: {
        story:
          'Поле ввода с вариантом underlined (в текущем компоненте это variant="form").'
      }
    }
  }
};

export const Bordered: Story = {
  args: {
    variant: 'filter',
    size: 'big',
    name: 'bordered-input',
    placeholder: 'Search by status'
  },
  parameters: {
    docs: {
      description: {
        story:
          'Поле ввода с вариантом bordered (в текущем компоненте это variant="filter").'
      }
    }
  }
};

export const WithIcon: Story = {
  args: {
    variant: 'filter',
    size: 'small',
    name: 'with-icon-input',
    placeholder: 'Find character'
  },
  parameters: {
    docs: {
      description: {
        story: 'TextInput с иконкой.'
      }
    }
  }
};

export const WithValue: Story = {
  args: {
    variant: 'filter',
    size: 'big',
    name: 'with-value-input',
    placeholder: 'Search by status',
    value: 'Alive'
  },
  parameters: {
    docs: {
      description: {
        story: 'Поле ввода с уже заполненным значением.'
      }
    }
  }
};
