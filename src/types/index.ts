interface PolicyHolder {
  code: string;
  name: string;
  registration_date: string;
  introducer_code: string;
}

interface PolicyHolderBranch extends PolicyHolder {
  l: PolicyHolderBranch | null;
  r: PolicyHolderBranch | null;
}

interface PolicyHolderTree extends PolicyHolder {
  l: PolicyHolder[];
  r: PolicyHolder[];
}

export { PolicyHolder, PolicyHolderTree, PolicyHolderBranch };