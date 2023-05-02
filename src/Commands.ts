import { Command } from "./types/Command";
import { Hello } from "./commands/Hello";
import { Dienst } from "./commands/Dienst";
import { OffDuty } from "./commands/OffDuty";

export const Commands: Command[] = [
    Hello,
    Dienst,
    OffDuty,
];