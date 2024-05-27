import React, { Component, useCallback, useState, useRef } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls
} from 'reactflow';
import 'reactflow/dist/style.css';
import './App.css';
import Sidebar from './Component/Sideber';
import NodeType from './Component/NodeType';

// Importing toastify module
import { toast, ToastContainer } from "react-toastify";
 
// Import toastify css file
import "react-toastify/dist/ReactToastify.css";


const initialNodes = [
  
];

let id = 0;
const getId = () => `dndnode_${id++}`;
const nodeTypes = { textUpdater: NodeType };





const App=()=>  {
    const [show,setShow]=useState(true)    

    
    const reactFlowWrapper = useRef(null);
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const [reactFlowInstance, setReactFlowInstance] = useState(null);
  

    const [editValue,setEditValue] = useState("")
    const [id, setId] = useState()


    const onNodeClick =(e,val)=>{
      setEditValue(val.data.label)
      setId(val.id)
      setShow(false)
    }

    const handleChnage=(e)=>{
      e.preventDefault()
      setEditValue(e.target.value)
    }

    const hnadleEdit =()=>{
      const res =nodes.map((item)=>{
        if(item.id === id){
          item.data={
            ...item.data,
            label:editValue
          }
        }
        return item
      })
      setNodes(res)
      setEditValue('')
      setShow(true)

    }



    const onConnect = useCallback(
      (params) => setEdges((eds) => addEdge(params, eds)),
      [],
    );

  
    const onDragOver = useCallback((event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = 'move';
    }, []);
  
    const onDrop = useCallback(
      (event) => {
        event.preventDefault();
  
        const type = event.dataTransfer.getData('application/reactflow');
  
        // check if the dropped element is valid
        if (typeof type === 'undefined' || !type) {
          return;
        }
  
        // reactFlowInstance.project was renamed to reactFlowInstance.screenToFlowPosition
        // and you don't need to subtract the reactFlowBounds.left/top anymore
        // details: https://reactflow.dev/whats-new/2023-11-10
        const position = reactFlowInstance.screenToFlowPosition({
          x: event.clientX,
          y: event.clientY,
        });
        const newNode = {
          id: getId(),
          type:'textUpdater',
          position,
          data: { label: `${type} node` },
        };
  
        setNodes((nds) => nds.concat(newNode));
      },
      [reactFlowInstance],
    );
  

    // Demo of Save Flow Function. After Check, We can Call Api to save the flow Data
    const SaveData=async()=>{
      const sourceArr =edges.map(el=>el.source)
      const taggetArr =edges.map(el=>el.target)

      const alled = [...sourceArr,...taggetArr]
      
      const boolVal = nodes.map(el=>alled.includes(el.id))

      if(boolVal.includes(false)){
        console.log("Cannot Save flow");
        toast.error("Cannot Save flow",{
          position:"top-center",
      });
      }
      else{
        toast.success("Flow Saved Successfully",{
          position:"top-center" ,
      });
      }
    }


    return (<>
    <ToastContainer/>
    <div className='flex py-3 bg-slate-300 items-center'>
      <div className='flex-1'><h2 className=' text-center'>Demo Flow By Sagnik Biswas</h2></div>
      <div className=' text-center w-56'>
        <button className=' border-2 border-black rounded py-1 w-28 ' onClick={SaveData}>Save</button>
      </div>
    </div>
      <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodeClick={(e,val)=>onNodeClick(e,val)}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            {/* <Controls /> */}
          </ReactFlow>
        </div>
        {show?
        <Sidebar />
        :(
        <div className=' border-l-2 border-sky-600 px-4 pt-4'>
          <h2 className=' text-xl font-bold'>Message</h2>
          <input className=' px-2 py-1  mt-2 border-sky-600 border-2' type="text" value={editValue} onChange={handleChnage} /><br></br>
          <button className=' mt-2 bg-blue-700 text-white px-10 py-2 rounded ' onClick={hnadleEdit}>Update</button>
        </div>
        )}
        
      </ReactFlowProvider>
    </div>
    </>
    );
}

export default App;
