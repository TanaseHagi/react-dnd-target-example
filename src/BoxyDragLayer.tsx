/* eslint-disable */
import React, { FC } from "react";
import { XYCoord, useDragLayer } from "react-dnd";
import { ItemTypes } from "./ItemTypes";

const layerStyles: React.CSSProperties = {
    position: "fixed",
    pointerEvents: "none",
    zIndex: 100,
    left: 0,
    top: 0,
    width: "100%",
    height: "100%"
};

function getItemStyles(
    initialOffset: XYCoord | null,
    currentOffset: XYCoord | null,
    offset: XYCoord | null
) {
    if (!initialOffset || !currentOffset || !offset) {
        return {
            display: "none"
        };
    }

    // let { x, y } = currentOffset;

    let { x, y } = {
        x: offset.x + 10,
        y: offset.y + 10
    };

    const transform = `translate(${x}px, ${y}px)`;
    return {
        transform,
        WebkitTransform: transform
    };
}

export const BoxyDragLayer: FC = props => {
    const {
        isDragging,
        itemType,
        item,
        initialOffset,
        currentOffset,
        clientOffset
    } = useDragLayer(monitor => {
        return {
            item: monitor.getItem(),
            itemType: monitor.getItemType(),
            initialOffset: monitor.getInitialSourceClientOffset(),
            currentOffset: monitor.getSourceClientOffset(),
            isDragging: monitor.isDragging(),
            clientOffset: monitor.getClientOffset()
        };
    });

    if ((item && item.type) !== ItemTypes.BOX) { return null }

    return (
        <div style={layerStyles}>
            <div
                style={{
                    display: "inline-block",
                    ...getItemStyles(initialOffset, currentOffset, clientOffset),
                    backgroundColor: "blueviolet",
                    color: "whitesmoke",
                    padding: "10px"
                }}
            >
                <div>My drag layer: {item && item.name}</div>
                {/* <div>isDragging: {isDragging}</div>
        <div>itemType: {String(itemType)}</div>
        <div>item: {JSON.stringify(item)}</div>
        {initialOffset != null || currentOffset != null ? (
          <>
            <div>
              initialOffset: {initialOffset.x} x {initialOffset.y}
            </div>
            <div>
              currentOffset: {currentOffset.x} x {currentOffset.x}
            </div>
            <div>
              clientOffset: {clientOffset.x} x {clientOffset.x}
            </div>
          </>
        ) : null} */}
            </div>
        </div>
    );
};
