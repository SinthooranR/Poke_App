import React from "react";
import { SvgXml } from "react-native-svg";

const InfoIcon = () => {
  return (
    <SvgXml
      xml={`<svg xmlns="http://www.w3.org/2000/svg" fill="none" height=32 width=32 viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" class="w-6 h-6">
      <path stroke-linecap="round" stroke-linejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
    </svg>
    
`}
    />
  );
};

export default InfoIcon;
