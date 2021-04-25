import React from 'react';

import { A } from '../A';
import { H1 } from '../H1';
import { Hr } from '../Hr';
import { Span } from '../Span';
import { Ul } from '.';

export default {
  component: Ul,
  title: 'Ul',
};

export const Default: React.FC = () => (
  <>
    <H1>Input</H1>
    <Hr spacer />
    <Hr size="micro" />
    <Ul>
      <li>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum, animi iusto laborum magnam fugiat, temporibus
        fugit eligendi optio veritatis vitae nobis minima aspernatur sunt voluptatibus odit deleniti vel, error aut.
      </li>
      <li>
        Dolor sit amet consectetur adipisici. Nostrum, animi iusto laborum magnam fugiat, temporibus fugit eligendi
        optio veritatis vitae nobis minima aspernatur sunt voluptatibus odit deleniti vel, error aut.
      </li>
      <li>
        Ipsum dolor sit amet. Nostrum, animi iusto laborum magnam fugiat, temporibus fugit eligendi optio veritatis
        vitae nobis minima aspernatur sunt voluptatibus odit deleniti vel.
      </li>
      <li>
        <Span bold> Adipisicing: </Span> elit. <A href="http://example.com"> Temporibus</A> fugit{' '}
        <Span italics>
          eligendi optio veritatis vitae nobis minima aspernatur sunt voluptatibus odit deleniti vel, error aut.{' '}
        </Span>
      </li>
    </Ul>
  </>
);
