import type { Meta, StoryObj } from '@storybook/react';

import { StatusCircle, type StatusesType } from '../Status/Status';
import { Select, type SelectOptionContentProps } from './Select';

const options = [
  { value: 'alive', label: 'Alive' },
  { value: 'dead', label: 'Dead' },
  { value: 'unknown', label: 'Unknown' }
] as const;

const commonArgs = {
  options: [...options]
};

const SelectStatusOption = ({
  value,
  optionValue
}: SelectOptionContentProps<string>) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
    <StatusCircle status={optionValue as StatusesType} />
    <span>{value}</span>
  </div>
);

const meta: Meta<typeof Select> = {
  title: 'Shared/Select',
  component: Select,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'radio', options: ['default', 'small'] },
    value: { control: 'text' },
    placeholder: { control: 'text' },
    options: { control: false },
    onChange: { control: false },
    SelectOptionComponent: { control: false }
  }
};

export default meta;
type Story = StoryObj<typeof Select>;

export const Large: Story = {
  args: {
    ...commonArgs,
    variant: 'default',
    placeholder: 'Choose status'
  },
  parameters: {
    docs: {
      description: {
        story: 'Большой селектор (large) без выбранного значения.'
      }
    }
  }
};

export const Small: Story = {
  args: {
    ...commonArgs,
    variant: 'small',
    placeholder: 'Status'
  },
  parameters: {
    docs: {
      description: {
        story: 'Маленький селектор (small) без выбранного значения.'
      }
    }
  }
};

export const SmallSelected: Story = {
  args: {
    ...commonArgs,
    variant: 'small',
    placeholder: 'Status',
    value: 'alive'
  },
  parameters: {
    docs: {
      description: {
        story: 'Маленький селектор с уже выбранным значением.'
      }
    }
  }
};

export const WithCustomOptionRenderer: Story = {
  args: {
    ...commonArgs,
    variant: 'default',
    placeholder: 'Choose status',
    value: 'dead',
    SelectOptionComponent: SelectStatusOption
  },
  parameters: {
    docs: {
      description: {
        story:
          'Селектор с кастомным рендером опций через OptionRenderer (в компоненте используется SelectOptionComponent).'
      }
    }
  }
};
