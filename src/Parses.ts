import {RNA,DNA, AA} from "./symbols/Symbols";
export interface IParseRNA {
    ParseRNA: {
        (b:string):RNA;
        (b:RNA):string;
    }
    ParseOpositeRna:{
        (b:string):RNA;
        (b:RNA):string;
    }
}