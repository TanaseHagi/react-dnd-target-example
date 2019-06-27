/* eslint-disable */
import React, { FC, useState } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { Boxy, ChangeEvent } from "./Boxy";
import { ItemTypes } from "./ItemTypes";
import { BoxyTron } from "./BoxyTron";
import { BoxyDragLayer } from "./BoxyDragLayer";

const App: FC = () => {
    const [logs, setLogs] = useState<string[]>([]);

    const onChange = ({ dragSource, dropTarget }: ChangeEvent) => {
        if (dropTarget == null) {
            setLogs([...logs, `did not drop ${dragSource.name} on any target`])
            return;
        }
        setLogs([...logs, `dropped ${dragSource.name} on ${dropTarget.name}`]);
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <BoxyDragLayer />
            <div>
                <Boxy
                    onChange={onChange}
                    accept={[ItemTypes.ROCK]}
                    type={ItemTypes.SCISSORS}
                    name={ItemTypes.SCISSORS.toLowerCase()}
                />
                <Boxy
                    onChange={onChange}
                    accept={[ItemTypes.SCISSORS]}
                    type={ItemTypes.PAPER}
                    name={ItemTypes.PAPER.toLowerCase()}
                />
                <Boxy
                    onChange={onChange}
                    accept={[ItemTypes.PAPER]}
                    type={ItemTypes.ROCK}
                    name={ItemTypes.ROCK.toLowerCase()}
                />
            </div>
            <div style={{ clear: "both" }}>
                <BoxyTron
                    onChange={onChange}
                    accept={[ItemTypes.BOX]}
                    type={ItemTypes.BOX}
                    name={"Boxy 1"}
                />
                <BoxyTron
                    onChange={onChange}
                    accept={[ItemTypes.BOX]}
                    type={ItemTypes.BOX}
                    name={"Boxy 2"}
                />
                <BoxyTron
                    onChange={onChange}
                    accept={[ItemTypes.BOX]}
                    type={ItemTypes.BOX}
                    name={"Boxy 3"}
                />
            </div>
            <div style={{ clear: "both" }}>
                {logs.map((log, i) => <div key={i} style={{ padding: "5px 0" }}>{log}</div>)}
            </div>
        </DndProvider>
    );
}

export default App;
