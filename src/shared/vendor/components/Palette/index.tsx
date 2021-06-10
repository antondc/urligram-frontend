import React from 'react';

import { Hr } from '../Hr';
import { Span } from '../Span';

import './Palette.less';

export const Palette: React.FC = () => (
  <div className="Palette">
    <div className="Palette-colors">
      <div className="Palette-color Palette-color--base">
        <div className="Palette-sample" />
        <div className="Palette-description">
          <Span className="Palette-title" size="small" weight="semiBold">
            Base
          </Span>
          <Span className="Palette-html" size="small">
            #242424
          </Span>
          <Span className="Palette-rgb" size="small">
            36, 36, 36
          </Span>
        </div>
      </div>
      <div className="Palette-color Palette-color--background">
        <div className="Palette-sample" />
        <div className="Palette-description">
          <Span className="Palette-title" size="small" weight="semiBold">
            Background
          </Span>
          <Span className="Palette-html" size="small">
            #fefaee
          </Span>
          <Span className="Palette-rgb" size="small">
            255, 254,
          </Span>
        </div>
      </div>
      <div className="Palette-color Palette-color--accent">
        <div className="Palette-sample" />
        <div className="Palette-description">
          <Span className="Palette-title" size="small" weight="semiBold">
            Accent
          </Span>
          <Span className="Palette-html" size="small">
            #4c4c4c
          </Span>
          <Span className="Palette-rgb" size="small">
            102, 102, 102
          </Span>
        </div>
      </div>
      <div className="Palette-color Palette-color--success">
        <div className="Palette-sample" />
        <div className="Palette-description">
          <Span className="Palette-title" size="small" weight="semiBold">
            Success
          </Span>
          <Span className="Palette-html" size="small">
            #72a4f6
          </Span>
          <Span className="Palette-rgb" size="small">
            161, 240, 232
          </Span>
        </div>
      </div>
      <div className="Palette-color Palette-color--alert">
        <div className="Palette-sample" />
        <div className="Palette-description">
          <Span className="Palette-title" size="small" weight="semiBold">
            Alert
          </Span>
          <Span className="Palette-html" size="small">
            #ffe393
          </Span>
          <Span className="Palette-rgb" size="small">
            235, 133, 112
          </Span>
        </div>
      </div>
      <div className="Palette-color Palette-color--error">
        <div className="Palette-sample" />
        <div className="Palette-description">
          <Span className="Palette-title" size="small" weight="semiBold">
            Error
          </Span>
          <Span className="Palette-html" size="small">
            #ff625d
          </Span>
          <Span className="Palette-rgb" size="small">
            255, 112, 112
          </Span>
        </div>
      </div>
      <div className="Palette-color Palette-color--disabled">
        <div className="Palette-sample" />
        <div className="Palette-description">
          <Span className="Palette-title" size="small" weight="semiBold">
            Disabled
          </Span>
          <Span className="Palette-html" size="small">
            #999999
          </Span>
          <Span className="Palette-rgb" size="small">
            247, 247, 247
          </Span>
        </div>
      </div>
      <div className="Palette-color Palette-color--?">
        <div className="Palette-sample" />
        <div className="Palette-description">
          <Span className="Palette-title" size="small" weight="semiBold">
            ?
          </Span>
          <Span className="Palette-html" size="small">
            #??????
          </Span>
          <Span className="Palette-rgb" size="small">
            ?, ?, ?
          </Span>
        </div>
      </div>
    </div>
    <Hr />
    <div className="Palette-grid">
      <div className="Palette-item Palette-item--base">Base</div>
      <div className="Palette-item Palette-item--background">Background</div>
      <div className="Palette-item Palette-item--accent">Accent</div>
      <div className="Palette-item Palette-item--success">Success</div>
      <div className="Palette-item Palette-item--alert">Alert</div>
      <div className="Palette-item Palette-item--error">Error</div>
      <div className="Palette-item Palette-item--disabled">Disabled</div>
    </div>
    <Hr />
    <div className="Palette-grid">
      <div className="Palette-item Palette-item--blue-1">#3c80f1</div>
      <div className="Palette-item Palette-item--blue-2">#72a4f6</div>
      <div className="Palette-item Palette-item--blue-3">#97c1ff</div>
      <div className="Palette-item Palette-item--blue-4">#c7ddff</div>
      <div className="Palette-item Palette-item--blue-5">#d4e4fc</div>
      <div className="Palette-item Palette-item--blue-6" />
      <div className="Palette-item Palette--noHover" />
      <div className="Palette-item Palette-item--green-1">#2fe87d</div>
      <div className="Palette-item Palette-item--green-2">#3cec86</div>
      <div className="Palette-item Palette-item--green-3">#7bf4ae</div>
      <div className="Palette-item Palette-item--green-4">#b6f7d2</div>
      <div className="Palette-item Palette-item--green-5">#c8f6db</div>
      <div className="Palette-item Palette-item--green-6" />
      <div className="Palette-item Palette--noHover" />
      <div className="Palette-item Palette-item--red-1">#ff3e33</div>
      <div className="Palette-item Palette-item--red-2">#ff625d</div>
      <div className="Palette-item Palette-item--red-3">#fc8f8b</div>
      <div className="Palette-item Palette-item--red-4">#ffb8b8</div>
      <div className="Palette-item Palette-item--red-5">#ffd9d7</div>
      <div className="Palette-item Palette-item--red-6" />
      <div className="Palette-item Palette--noHover" />
      <div className="Palette-item Palette-item--yellow-1">#ffd354</div>
      <div className="Palette-item Palette-item--yellow-2">#ffe393</div>
      <div className="Palette-item Palette-item--yellow-3">#ffebb2</div>
      <div className="Palette-item Palette-item--yellow-4">#fff5d8</div>
      <div className="Palette-item Palette-item--yellow-5">#fefaee</div>
      <div className="Palette-item Palette-item--yellow-6">#fffff9</div>
      <div className="Palette-item Palette--noHover" />
      <div className="Palette-item Palette-item--black-1">#272727</div>
      <div className="Palette-item Palette-item--black-2">#4c4c4c</div>
      <div className="Palette-item Palette-item--black-3">#999999</div>
      <div className="Palette-item Palette-item--black-4">#dedede</div>
      <div className="Palette-item Palette-item--black-5">#f8f8f8</div>
      <div className="Palette-item Palette-item--black-6">#fcfcfc</div>
      <div className="Palette-item Palette--noHover" />
      <div className="Palette-item Palette-item--black-traslucid-1" />
      <div className="Palette-item Palette-item--black-traslucid-2">#4c4c4c80</div>
      <div className="Palette-item Palette-item--black-traslucid-3" />
      <div className="Palette-item Palette-item--black-traslucid-4" />
      <div className="Palette-item Palette-item--black-traslucid-5">#f8f8f8</div>
      <div className="Palette-item Palette-item--black-traslucid-6" />
      <div className="Palette-item Palette--noHover" />
    </div>
  </div>
);
