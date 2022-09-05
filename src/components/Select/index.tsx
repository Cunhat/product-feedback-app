import React from 'react';

type SelectProps = {
  value: Array<{
    label: string;
    id: string;
  }>;
};

export const Select = React.forwardRef((props: SelectProps, ref) => {
  return (
    <>
      <select
        ref={ref}
        id='countries'
        defaultValue={undefined}
        style={{ borderRight: '22px solid transparent' }}
        className='bg-stone border-none pl-6 py-3 w-full font-regular text-[15px] text-dark-blue rounded-sm cursor-pointer'
      >
        {props?.value?.length > 0 &&
          props?.value?.map((val) => (
            <option key={val.id} value={val.id}>
              {val.label}
            </option>
          ))}
      </select>
    </>
  );
});
