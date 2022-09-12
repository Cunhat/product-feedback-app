import React from 'react';

type SelectProps = {
  value: Array<{
    name: string;
    id: string;
  }>;
};

// eslint-disable-next-line react/display-name
export const Select = React.forwardRef((props: SelectProps, ref: any) => {
  return (
    <>
      <select
        ref={ref}
        id='select-component'
        defaultValue={undefined}
        style={{ borderRight: '22px solid transparent' }}
        className='bg-stone border-none pl-6 py-3 w-full font-regular text-[15px] text-dark-blue rounded-sm cursor-pointer'
      >
        {props?.value?.length > 0 &&
          props?.value?.map((val) => (
            <option key={val.id} value={val.id}>
              {val.name}
            </option>
          ))}
      </select>
    </>
  );
});
