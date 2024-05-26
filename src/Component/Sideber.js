import React from 'react';
import msg from "../Accests/msg.svg"

export default () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
    
  };

  return (
    <aside className=' border-sky-600 border-l-2 px-6 pt-4'>
      <p className=" text-sm">You can drag these nodes to the pane on the right.</p>
      {/* <div className="dndnode input" onDragStart={(event) => onDragStart(event, 'input')} draggable>
        Input Node
      </div> */}
      <div className="mt-5 py-3 w-44 text-center border-sky-600 text-sky-600 font-bold border-2 rounded " onDragStart={(event) => (onDragStart(event, 'default'))} draggable>
        <div className='flex justify-center'><img src={msg} width={30}/></div>
        <h3 className='mt-1'>Message</h3>
      </div>
      {/* <div className="dndnode output" onDragStart={(event) => onDragStart(event, 'output')} draggable>
        Output Node
      </div> */}
    </aside>
  );
};
