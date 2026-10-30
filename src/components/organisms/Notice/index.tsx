import { Container } from 'components/atoms';
import React, { ReactNode } from 'react';

interface Props {
  text: ReactNode;
}

export default function Notice({ text }: Props) {
  return (
    <div data-notice className="bg-indigo-600 text-white">
      <Container className="py-2.5 text-sm text-center [&_a]:font-semibold [&_a]:underline [&_a]:underline-offset-2 [&_a]:rounded-sm [&_a]:focus:outline-none [&_a]:focus-visible:ring-2 [&_a]:ring-white">
        <p>{text}</p>
      </Container>
    </div>
  );
}
