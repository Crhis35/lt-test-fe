import React, { forwardRef } from 'react';
import { Group, Avatar, Text, Select, SelectProps } from '@mantine/core';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  image: string;
  label: string;
  description: string;
}

// eslint-disable-next-line react/display-name
const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ image, label, description, ...others }: ItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group noWrap>
        <Avatar src={image} />

        <div>
          <Text size="sm">{label}</Text>
          <Text size="xs" opacity={0.65}>
            {description}
          </Text>
        </div>
      </Group>
    </div>
  )
);

function Dropdown(props: SelectProps) {
  return (
    <Select
      itemComponent={SelectItem}
      searchable
      maxDropdownHeight={400}
      nothingFound="Nobody here"
      filter={(value, item) =>
        item?.label?.toLowerCase().includes(value.toLowerCase().trim()) ||
        item?.description.toLowerCase().includes(value.toLowerCase().trim())
      }
      {...props}
    />
  );
}
export default Dropdown;
