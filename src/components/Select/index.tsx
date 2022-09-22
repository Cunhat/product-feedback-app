import React from 'react';
import * as SelectComp from '@radix-ui/react-Select';
import Image from 'next/image';
import CheckIcon from '@/assets/icons/icon-check.svg';
import ArrowDown from '@/assets/icons/icon-arrow-down.svg';

type SelectProps = {
  data: Array<{
    name: string;
    id: string;
    selected?: boolean;
  }>;
  onChange: (value: string) => void;
  value: string;
};

export const Select = (props: SelectProps) => {
  return (
    <SelectComp.Root defaultValue={props.value || undefined} onValueChange={props.onChange}>
      <SelectComp.Trigger
        className={
          'bg-stone border-none px-6 py-3 w-full font-regular text-[15px] text-dark-blue rounded-sm cursor-pointer justify-between flex'
        }
      >
        <SelectComp.Value placeholder='Select a option...' />
        <SelectComp.Icon>
          <Image src={ArrowDown} />
        </SelectComp.Icon>
      </SelectComp.Trigger>
      <SelectComp.Portal>
        <SelectComp.Content className='bg-white rounded-[10px] drop-shadow-lg'>
          <SelectComp.Viewport>
            <SelectComp.Group>
              {props.data.map((item, index) => (
                <>
                  <SelectComp.Item
                    value={item.id}
                    className='px-6 py-3 text-gray-custom hover:text-custom-violet hover:cursor-pointer text-[16px] font-regular justify-between flex'
                  >
                    <SelectComp.ItemText>{item.name}</SelectComp.ItemText>
                    <SelectComp.ItemIndicator>
                      <Image src={CheckIcon} />
                    </SelectComp.ItemIndicator>
                  </SelectComp.Item>
                  {props.data.length - 1 > index && (
                    <SelectComp.Separator className='bg-dark-blue h-[1px] opacity-5'></SelectComp.Separator>
                  )}
                </>
              ))}
            </SelectComp.Group>
          </SelectComp.Viewport>
        </SelectComp.Content>
      </SelectComp.Portal>
    </SelectComp.Root>
  );
};
