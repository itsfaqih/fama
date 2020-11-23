import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { TextSelectOption } from 'components/atoms';
import TextSelectProps from 'components/molecules/TextSelect/types';
import classNames from 'classnames';

export default function TextSelect({ options, state, className }: TextSelectProps) {
  const [selectedOption, setSelectedOption] = state;

  return (
    <Listbox as="div" className={className} value={selectedOption} onChange={setSelectedOption}>
      {({ open }) => (
        <>
          <Listbox.Button className="flex items-center px-4 py-2 text-gray-700 bg-white rounded-lg focus:outline-none focus:ring-2 ring-indigo-500">
            {selectedOption.label}
            <svg
              className={classNames('w-4 h-4 ml-2 transition-transform transform', {
                'rotate-180': open,
              })}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Listbox.Button>
          <Transition
            show={open}
            enter="transition duration-100 ease-out"
            enterFrom="transform scale-90 opacity-0"
            enterTo="transform scale-110 opacity-100"
            leave="transition duration-75 ease-out"
            leaveFrom="transform scale-110 opacity-100"
            leaveTo="transform scale-90 opacity-0"
            className="absolute mt-4 transition duration-150"
          >
            <Listbox.Options static className="overflow-hidden bg-white shadow-md rounded-xl focus:outline-none focus:ring-2 ring-indigo-500">
              {options.map(option => (
                <Listbox.Option as={Fragment} key={option.value} value={option}>
                  {({ active, selected }) => (
                    <TextSelectOption
                      active={active}
                      selected={selected}
                      onClick={() => setSelectedOption(option)}
                    >
                      {option.label}
                    </TextSelectOption>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </>
      )}
    </Listbox>
  );
}
