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
            enter="duration-100 ease-out"
            enterFrom="scale-90 opacity-0"
            enterTo="scale-110 opacity-100"
            leave="duration-75 ease-out"
            leaveFrom="scale-110 opacity-100"
            leaveTo="scale-90 opacity-0"
            className="fixed z-20 transition duration-150 transform -translate-x-1/2 -translate-y-1/2 sm:translate-x-0 sm:translate-y-0 sm:mt-4 sm:absolute left-1/2 top-1/2 sm:left-auto sm:top-auto"
          >
            <Listbox.Options
              static
              className="overflow-hidden text-3xl bg-white shadow-md rounded-xl focus:outline-none focus:ring-2 ring-indigo-500 sm:text-base"
            >
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
