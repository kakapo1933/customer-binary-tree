import React, { useState, useCallback } from 'react';
import { getPolicyHolder } from '../services/api';
import PolicyHolderTree from '../components/PolicyHolderTree';
import { PolicyHolderTree as PolicyHolderTreeType, PolicyHolder as PolicyHolderType } from '../types';

const MAX_POLICY_HOLDERS = 15;

const PolicyHolderPage: React.FC = () => {
  const [searchCode, setSearchCode] = useState('');
  const [policyHolders, setPolicyHolders] = useState<PolicyHolderType[]>([]);
  const [currentRootCode, setCurrentRootCode] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPolicyHolders = useCallback(async (rootCode: string) => {
    const allPolicyHolders: PolicyHolderTreeType[] = [];
    const queue: PolicyHolderTreeType[] = [];

    try {
      const rootPolicyHolder = await getPolicyHolder(rootCode);
      allPolicyHolders.push(rootPolicyHolder);
      queue.push(rootPolicyHolder);

      while (queue.length > 0 && allPolicyHolders.length < MAX_POLICY_HOLDERS) {
        const currentNode = queue.shift()!;
        const children = [...currentNode.l, ...currentNode.r];

        for (const child of children) {
          if (allPolicyHolders.length >= MAX_POLICY_HOLDERS) break;

          const childPolicyHolder = await getPolicyHolder(child.code);
          allPolicyHolders.push(childPolicyHolder);
          queue.push(childPolicyHolder);
        }
      }

      return allPolicyHolders.map(({ l, r, ...rest }) => rest);
    } catch (error) {
      throw new Error('Failed to fetch policy holders');
    }
  }, []);

  const handleSearch = useCallback(async () => {
    if (!searchCode.trim()) {
      setError('Please enter a valid policy holder code');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const simplifiedPolicyHolders = await fetchPolicyHolders(searchCode);
      setPolicyHolders(simplifiedPolicyHolders);
      setCurrentRootCode(searchCode);
    } catch (error) {
      setError('Error fetching policy holder');
    } finally {
      setIsLoading(false);
    }
  }, [searchCode, fetchPolicyHolders]);

  const handleChangePolicyHolder = useCallback(async (newCode: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const simplifiedPolicyHolders = await fetchPolicyHolders(newCode);
      setPolicyHolders(simplifiedPolicyHolders);
      setSearchCode(newCode);
      setCurrentRootCode(newCode);
    } catch (error) {
      setError('Error fetching policy holder');
    } finally {
      setIsLoading(false);
    }
  }, [fetchPolicyHolders]);

  const handleViewTop = useCallback(async () => {
    if (currentRootCode) {
      setIsLoading(true);
      setError(null);

      try {
        const currentRoot = await getPolicyHolder(currentRootCode);
        if (currentRoot.introducer_code) {
          await handleChangePolicyHolder(currentRoot.introducer_code);
        } else {
          setError('This is the top-level policy holder');
        }
      } catch (error) {
        setError('Error fetching top policy holder');
      } finally {
        setIsLoading(false);
      }
    }
  }, [currentRootCode, handleChangePolicyHolder]);

  return (
    <div className="policy-holder-page">
      <h1>保戶介紹關係系統</h1>
      <div className="search-container">
        <input
          type="text"
          value={searchCode}
          onChange={(e) => setSearchCode(e.target.value)}
          placeholder="輸入保戶編號"
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
        />
        <button onClick={handleSearch} disabled={!searchCode.trim() || isLoading}>搜尋</button>
        <button onClick={handleViewTop} disabled={!currentRootCode || isLoading}>查看上層</button>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!isLoading && !error && policyHolders.length > 0 ? (
        <PolicyHolderTree nodes={policyHolders} handleChangePolicyHolder={handleChangePolicyHolder} />
      ) : (
        <p>No policy holders found.</p>
      )}
    </div>
  );
};

export default PolicyHolderPage;
