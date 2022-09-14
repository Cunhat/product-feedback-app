import React from 'react';

type SelectProps = {
  data: Array<{
    name: string;
    id: string;
    selected?: boolean;
  }>;
  onChange: (value: string) => void;
  value: string;
};

// eslint-disable-next-line react/display-name
export const Select = React.forwardRef((props: SelectProps, ref: any) => {
  return (
    <>
      <select
        ref={ref}
        id='select-component'
        style={{ borderRight: '22px solid transparent' }}
        value={props.value}
        className='bg-stone border-none pl-6 py-3 w-full font-regular text-[15px] text-dark-blue rounded-sm cursor-pointer'
        onChange={e => props.onChange(e.target.value)}
      >
        {props?.data?.length > 0 &&
          props?.data?.map((val) => (
            <option key={val.id} value={val.id}>
              {val.name}
            </option>
          ))}
      </select>
    </>
  );
});


