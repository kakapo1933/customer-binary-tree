import React from 'react';
import { PolicyHolder as PolicyHolderType, PolicyHolderBranch as PolicyHolderBranchType } from '../types';
import Node from './Node';
import '../styles/index.css';

interface PolicyHolderTreeProps {
  nodes: PolicyHolderType[];
  handleChangePolicyHolder: (newCode: string) => void;
}

const PolicyHolderTree: React.FC<PolicyHolderTreeProps> = ({ nodes, handleChangePolicyHolder }) => {
  const buildTree = (nodes: PolicyHolderType[]): PolicyHolderBranchType => {
    if (nodes.length === 0) {
      throw new Error("Cannot build tree from empty array");
    }
    const nodesArray = [...nodes];
    const root = nodesArray.shift();
    if (!root) {
      throw new Error("Root node is undefined");
    }
    const buildBranch = (node: PolicyHolderType, allNodes: PolicyHolderType[]): PolicyHolderBranchType => {
      const midIndex = Math.ceil(allNodes.length / 2);
      const leftChildren = allNodes.slice(0, midIndex);
      const rightChildren = allNodes.slice(midIndex);

      return {
        ...node,
        l: leftChildren.length > 0 ? buildBranch(leftChildren[0], leftChildren.slice(1)) : null,
        r: rightChildren.length > 0 ? buildBranch(rightChildren[0], rightChildren.slice(1)) : null,
      };
    };

    return buildBranch(root, nodesArray);
  };

  const renderBranchNode = (node: PolicyHolderBranchType | null, isRoot: boolean = false): React.ReactNode => {
    if (!node) return null;

    const rootCode = nodes[0].code;

    return (
      <div className="tree-node">
        <Node
          node={node}
          onChangePolicyHolder={handleChangePolicyHolder}
          isRoot={isRoot}
          isDirectChild={node.introducer_code === rootCode}
        />
        <div className="branch-line"></div>
        <div className="tree-children">
          {node.l && (
            <div className="tree-branch left">
              {renderBranchNode(node.l)}
            </div>
          )}
          {node.r && (
            <div className="tree-branch right">
              {renderBranchNode(node.r)}
            </div>
          )}
        </div>
      </div>
    );
  };

  const builtTree = buildTree(nodes);

  return (
    <div className="policy-holder-tree">
      {renderBranchNode(builtTree, true)}
    </div>
  );
};

export default PolicyHolderTree;
