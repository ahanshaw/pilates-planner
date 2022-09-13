import React, { useState, useEffect } from "react";
import { database } from '../../services/firebase';

const BlockList = () => {
    const [blocks, setBlocks] = useState();
    const [loading, setLoading] = useState(true);

    const capitalizeFirst = str => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    };

    useEffect(() => {
        let blockArr = [];
        database.ref('blocks').on('value', function (snapshot) {
            snapshot.forEach(block => {
                blockArr.push(block.val());
                setLoading(false);

            });
        });
        setBlocks(blockArr);
    }, []);

    if (loading) {
        return (
            <p>Just a moment while we find your workouts ...</p>
        )
    }

    return (
        <div className="container stack-xl">
            <h1>Blocks</h1>
            {blocks
                .map((block, index) => {
                    return (
                        <div className="stack" key={index}>
                            <h2>{block.title}</h2>
                            <p><strong>Type:</strong> {capitalizeFirst(block.type)}</p>
                            <p><strong>Level:</strong> {capitalizeFirst(block.level)}</p>
                            <p><strong>Focus:</strong> {capitalizeFirst(block.focus)}</p>
                            <p><strong>Equipment:</strong> {capitalizeFirst(block.equipment)}</p>
                            <p><strong>Props:</strong> {block.props?.length > 0 ?
                                block.props.map((prop, index) => {
                                    return (
                                        <span className="block-props" key={index}>
                                            {prop.replace(/-/g, ' ').toLowerCase()}
                                        </span>
                                    )
                                }) : <span>None</span>
                            }
                            </p>
                            <p><strong>Start position:</strong> {block.start}</p>
                            <p><strong>Instructions:</strong></p>
                            <ul className="stack-sm">
                                {block.instructions.map((instruction, index) => {
                                    return (
                                        <li key={index}>
                                            {instruction.step}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default BlockList;