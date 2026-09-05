import { Select } from '@base-ui/react/select';
import { cn } from 'cn';
import TextSelectProps from 'components/molecules/TextSelect/types';
import Icons from 'components/icons';

export default function TextSelect({ options, state, className }: TextSelectProps) {
  const [selectedOption, setSelectedOption] = state;

  const handleValueChange = (value: string | null) => {
    const nextOption = options.find((option) => String(option.value) === value);

    if (nextOption) {
      setSelectedOption(nextOption);
    }
  };

  return (
    <div className={className}>
      <Select.Root value={String(selectedOption.value)} onValueChange={handleValueChange}>
        <Select.Trigger
          aria-label="Language"
          className="flex items-center rounded-lg bg-white px-4 py-2 text-gray-700 focus:outline-none focus:ring-2 ring-indigo-500"
        >
          <Select.Value>{selectedOption.label}</Select.Value>
          <Select.Icon
            className={({ open }) =>
              cn('ml-2 h-4 w-4 transition-transform transform', open && 'rotate-180')
            }
          >
            <svg
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
          </Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner
            align="end"
            alignItemWithTrigger={false}
            className="language-positioner z-20"
            side="bottom"
            sideOffset={16}
          >
            <Select.Popup className="language-popup overflow-hidden rounded-xl bg-white text-3xl shadow-md focus:outline-none focus:ring-2 ring-indigo-500 sm:text-base">
              <Select.List>
                {options.map((option) => (
                  <Select.Item
                    key={String(option.value)}
                    value={String(option.value)}
                    onClick={() => setSelectedOption(option)}
                    className={({ highlighted }) =>
                      cn(
                        'relative flex w-60 cursor-pointer items-center py-4 px-8 hover:bg-indigo-50 sm:w-32 sm:py-2 sm:px-4',
                        highlighted && 'bg-indigo-50',
                      )
                    }
                  >
                    <Select.ItemText>{option.label}</Select.ItemText>
                    <Select.ItemIndicator className="absolute right-4 text-indigo-500">
                      <Icons.CheckRounded className="h-7 w-7 sm:h-4 sm:w-4" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
