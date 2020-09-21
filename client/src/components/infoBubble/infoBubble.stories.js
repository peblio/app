import React from 'react';
import InfoBubble from '../../app/components/InfoBubble/InfoBubble';


export default { title: 'InfoBubble' };

export const infoBubble = () => (
  <div style={{
    width: '300px',
    display: 'flex',
    justifyContent: 'center'
  }}
  >
    <InfoBubble position="bottom center">
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt, beatae impedit. Vitae culpa iste veritatis?
    </InfoBubble>
  </div>
);
