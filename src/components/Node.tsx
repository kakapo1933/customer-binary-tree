import React from 'react';
import { PolicyHolder as PolicyHolderType } from '../types';
import '../styles/index.css';

interface NodeProps {
  node: PolicyHolderType;
  onChangePolicyHolder: (newCode: string) => void;
  isRoot: boolean;
  isDirectChild: boolean;
}

const Node: React.FC<NodeProps> = ({ node, onChangePolicyHolder, isRoot, isDirectChild }) => {
  const handleClick = () => {
    if (node.code.trim()) {
      onChangePolicyHolder(node.code);
    }
  };

  const getBackgroundColor = () => {
    if (isRoot) return '#FAFA33';
    if (isDirectChild) return '#90EE90';
    return '#D3D3D3';
  };

  return (
    <div className="node" style={{ backgroundColor: getBackgroundColor() }}>
      <div className="node-title">
        <span 
          className="code" 
          onClick={handleClick} 
          role="button"
          tabIndex={0}
          onKeyPress={(e) => e.key === 'Enter' && handleClick()}
        >
          {node.code}
        </span>
      </div>
      <div className="node-content">
        <div className="name">{node.name}</div>
        <div className="registration-date">{node.registration_date}</div>
        {node.introducer_code && (
          <div className="introducer-code">Introducer: {node.introducer_code}</div>
        )}
      </div>
    </div>
  );
};

export default Node;
