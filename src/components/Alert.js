import React, { useRef, useState } from 'react';
import { Button, Overlay, Popover } from 'react-bootstrap';

const CustomAlert = (target, show) => {

      <Overlay
        show={true}
        target={target}
        placement="bottom"
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Popover bottom</Popover.Title>
          <Popover.Content>
            <strong>Holy guacamole!</strong> Check this info.
          </Popover.Content>
        </Popover>
      </Overlay>   
   
};

export default CustomAlert;