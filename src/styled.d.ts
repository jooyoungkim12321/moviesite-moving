import "styled-components";

declare module "styled-components"{
    export interface DefaultTheme{
        black:{
            light:string;
            darker:string;
            normal:string;
        }
        white:string;
        accent:string;
    }
}