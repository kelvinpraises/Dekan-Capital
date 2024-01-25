export interface User {
  name: string;
  avatarURL: string;
}

export interface PoolFund {
  emoji: string;
  title: string;
  detail: string;
  strategyAddress: string;
  createdAt: number;
}

export interface Project {
  tokensRequested: number;
  emoji: string;
  title: string;
  description: string;
}

export interface Showcase {
  poolFundId: number;
  projectId: number;
  recipientId: string;
  status: number;
}

export interface Allocation {
  amount: number;
  projectId: number;
}

export const BACKEND_ADDR = "http://localhost:3001";

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                       User Section                       */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export const createUser = async (user: User, callback: () => void) => {
  const res = await fetch(`${BACKEND_ADDR}/users/new-user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
    credentials: "include",
  });

  if ((await res.json()).userId) {
    callback();
  }
};

export const getUser = async (userId: string) => {
  const res = await fetch(`${BACKEND_ADDR}/users/${userId}`, {
    credentials: "include",
  });

  return await res.json();
};

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     PoolFunds Section                     */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export const createPool = async (
  poolFund: PoolFund,
  callback: (poolFundId: string) => void
) => {
  const res = await fetch(`${BACKEND_ADDR}/pool-funds`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(poolFund),
    credentials: "include",
  });

  const poolFundId = (await res.json()).poolFundId;

  if (poolFundId) {
    callback(poolFundId);
  }
};

export const getPoolFundById = async (poolFundId: string) => {
  const res = await fetch(`${BACKEND_ADDR}/pool-funds/${poolFundId}`, {
    credentials: "include",
  });

  if (res.ok) {
    return await res.json();
  } else if (res.status === 404) {
    throw new Error("poolFund not found");
  } else {
    throw new Error("Error fetching poolFund");
  }
};

export const getPoolFunds = async (userId?: string) => {
  const res = await fetch(`${BACKEND_ADDR}/pool-funds?userId=${userId}`, {
    credentials: "include",
  });
  return await res.json();
};

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     Projects Section                     */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export const createProject = async (
  project: Project,
  callback: (poolFundId: string) => void
) => {
  const res = await fetch(`${BACKEND_ADDR}/projects`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(project),
    credentials: "include",
  });

  const projectId = (await res.json()).projectId;

  if (projectId) {
    callback(projectId);
  }
};

export const getProjectById = async (projectId: string) => {
  const res = await fetch(`${BACKEND_ADDR}/projects/${projectId}`, {
    credentials: "include",
  });

  if (res.ok) {
    return (await res.json()) as Project;
  } else if (res.status === 404) {
    throw new Error("Project not found");
  } else {
    throw new Error("Error fetching project");
  }
};

export const getProjects = async (userId: string) => {
  const res = await fetch(`${BACKEND_ADDR}/projects?userId=${userId}`, {
    credentials: "include",
  });

  return await res.json();
};

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     Showcase Section                     */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export const showcasePoolFundProject = async (
  showcase: Showcase,
  callback: () => void
) => {
  const res = await fetch(`${BACKEND_ADDR}/showcase/${showcase.poolFundId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(showcase),
    credentials: "include",
  });

  if (res.ok) {
    callback();
  }
};

export const getPoolFundProjects = async (poolFundId: string) => {
  const res = await fetch(`${BACKEND_ADDR}/showcase/${poolFundId}`, {
    credentials: "include",
  });

  return await res.json();
};

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                    Allocation Section                    */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export const createPoolFundAllocation = async (
  poolFundId: string,
  allocations: Allocation[],
  callback: () => void
) => {
  const res = await fetch(`${BACKEND_ADDR}/allocate/${poolFundId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(allocations),
    credentials: "include",
  });

  if (res.ok) {
    callback();
  }
};

export const getPoolFundAllocations = async (poolFundId: string) => {
  const res = await fetch(`${BACKEND_ADDR}/allocate/${poolFundId}`, {
    credentials: "include",
  });

  return await res.json();
};
