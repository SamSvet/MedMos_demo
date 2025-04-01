import SBSansUILightWoff from "../assets/fonts/SBSansUI/SBSansUI-Light.woff";
import SBSansUILightWoff2 from "../assets/fonts/SBSansUI/SBSansUI-Light.woff2";
import SBSansUIRegularWoff from "../assets/fonts/SBSansUI/SBSansUI-Regular.woff";
import SBSansUIRegularWoff2 from "../assets/fonts/SBSansUI/SBSansUI-Regular.woff2";
import SBSansUISemiboldWoff from "../assets/fonts/SBSansUI/SBSansUI-Semibold.woff";
import SBSansUISemiboldWoff2 from "../assets/fonts/SBSansUI/SBSansUI-Semibold.woff2";

export const fontsOverrides = `
    ${[100, 200, 300]
      .map(
        (fontWeight) => `
        @font-face {
        font-family: "SBSansUI";
        src: url("${SBSansUILightWoff2}") format("woff2"),
                url("${SBSansUILightWoff}") format("woff");
        font-weight: ${fontWeight};
        }`,
      )
      .join("\r\n")} 
    
    ${[400, 500]
      .map(
        (fontWeight) => `
        @font-face {
            font-family: "SBSansUI";
            src: url("${SBSansUIRegularWoff2}") format("woff2"),
                    url("${SBSansUIRegularWoff}") format("woff");
            font-weight: ${fontWeight};
        }`,
      )
      .join("\r\n")}
      
    ${[600, 700, 800, 900]
      .map(
        (fontWeight) => `
        @font-face {
            font-family: "SBSansUI";
            src: url("${SBSansUISemiboldWoff2}") format("woff2"),
                url("${SBSansUISemiboldWoff}") format("woff");
            font-weight: ${fontWeight};
        }`,
      )
      .join("\r\n")}
`;
