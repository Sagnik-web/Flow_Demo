import { useCallback } from 'react';
import { Handle, Position } from 'reactflow';

const handleStyle = { left: 10 };

function NodeType({ data, isConnectable }) {
  

  return (
    <div className=" w-52 border-2 border-sky-600 rounded shadow-xl">
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />
      <div>
        <h3 className=' bg-sky-400 px-2 py-1'><span className=' font-semibold'>Send Message</span></h3>
        <p htmlFor="text" className='px-2 py-3'>{data.label}</p>
      </div>
     
      <Handle type="source" position={Position.Right} id="b" isConnectable={isConnectable} />
    </div>
  );
}

export default NodeType;
