import React from "react";
import { commands } from "../../constants";
import Help from "./help";
import Experience from "./experience";
import Education from "./education";
import Project from "./project";
import Whoami from "./whoami";
import Skill from "./skill";

function renderComponent (command) {
    switch(command){
        case commands[1].name:
            return <Help />;
        case commands[2].name:
            return <Experience />;
        case commands[3].name:
            return <Education />;
        case commands[4].name:
            return <Project />;
        case commands[5].name:
            return <Whoami />;
        case commands[6].name:
            return <Skill />;
        default: return null;
    }
}

export default function Script({props}) {
    const { command } = props;
    return (
        <div className="script">
            {
                renderComponent(command)
            }
        </div> 
    );
}