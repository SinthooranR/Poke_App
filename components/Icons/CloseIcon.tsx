import React from "react";
import { SvgXml } from "react-native-svg";

const CloseIcon = () => {
  return (
    <SvgXml
      xml={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" height=32 width=32 stroke="#000000" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
    
`}
    />
  );
};

export default CloseIcon;
