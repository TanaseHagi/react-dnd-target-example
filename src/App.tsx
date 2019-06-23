import React, { FC, useState } from "react";
import { DndProvider } from "react-dnd";
import HTML5Backend from "react-dnd-html5-backend";
import { Boxy, ChangeEvent } from "./Boxy";
import { ItemTypes } from "./ItemTypes";

const App: FC = () => {
    const [logs, setLogs] = useState<string[]>([]);

    const onChange = ({ dragSource, dropTarget }: ChangeEvent) => {
        setLogs([...logs, `dropped ${dragSource.type} into ${dropTarget.type}`])
    }

    return (
        <DndProvider backend={HTML5Backend}>
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
                {logs.map(log => <div key={log} style={{ padding: "5px 0" }}>{log}</div>)}
            </div>
        </DndProvider>
    );
}

export default App;
