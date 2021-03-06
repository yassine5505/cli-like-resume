import { outputLineTypes, messages } from "./constants";
import { commands } from "./constants";
import GuestHost from "./components/guest-host";
import Input from "./components/input";
import Script from "./components/script";
import NoCommandFound from "./components/script/no-command-found";
import Suggestions from "./components/script/suggestions";

export const guestHost = () => {
    return {
        type: outputLineTypes.guestHost,
        props: {
            text: ""
        },
        component: GuestHost
    }
}

export const input = (text) => {
    return {
        type: outputLineTypes.input,
        props: {
            text
        },
        component: Input
    }
}

export const executable = (command) => {
    return {
        type: outputLineTypes.executable,
        props: {
            command,
            text: ""
        },
        component: Script
    }
}

export const suggestions = (input) => {
    return {
        type: outputLineTypes.suggestions,
        input,
        suggestions: getSuggestions(input),
        component: Suggestions
    }
}

export const noCommandFound = (command) => {
    return {
        type: outputLineTypes.noCommandFound,
        props: {
            command,
            text: command + ": " + messages.noCommandFound
        },
        component: NoCommandFound
    };
}

// Function that adds new GuestHost object to the stack
export function addGuestHost(stack){
    stack.push(guestHost());
    return stack;
}

// Function that adds new input to the stack
export function addInput(stack, text = ""){
    stack.push(input(text));
    return stack;
}

// Function to add executable to the stack
export function addExecutable(command, stack){ 
    stack.push(executable(command));
    return stack;
}

// Function to add executable to the stack
export function addSuggestions(input, stack){ 
    stack.push(suggestions(input));
    return stack;
}

// Function to no command found input type to the stack
export function addNoCommandFound(stack, command){ 
    stack.push(noCommandFound(command));
    return stack;

}

// Function that concats input to the already typed in text
export function concatInput(input, stack){
    // Get the last input type element in the stack,
    // concat new input to it input
    stack.reverse();
    for(let i = 0; i < stack.length; i++) {
        if(stack[i].type === outputLineTypes.input) {
            stack[i].props.text = stack[i].props.text.concat(input);
            break;
        }
    }
    stack.reverse();
    return stack;
}

// Check if an input command is valid
export function inputIsValid(input) {
    let command;
    // From the commands array, see if any command alias matched with input
    commands.forEach((element) => {
        // aliases
        if(element.aliases.includes(input)) {
            command = element.name;
        }
    });
    return typeof command === "undefined" ? false : command;
}

// Check if the input command is "clear"
// "c" is an alias for "clear"
export function isClear(input) {
    return input === commands[0].name || input === "c";
}

// Returns an array with different suggestions

export function getSuggestions(input) {
    let suggestions = [];
    commands.forEach((cmd, i) => {
        cmd.aliases.forEach((alias, j) => {
            if(alias.substr(0, input.length) === input){
                suggestions.push(alias);
            }
        })
    });
    return suggestions;
}

/* 
    Constant variables used by App
*/
export const initialOutput = [
    executable("whoami"),
    guestHost(),
    input(messages.welcome),
    guestHost(),
    input("")
];

export const reinitializedOutput = [
    guestHost(),
    input("")
];