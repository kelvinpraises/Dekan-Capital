export interface User {
  name: string;
  avatarURL: string;
}

export interface EcoFund {
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
  ecoFundId: number;
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
/*                     EcoFunds Section                     */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export const createPool = async (
  ecoFund: EcoFund,
  callback: (ecoFundId: string) => void
) => {
  const res = await fetch(`${BACKEND_ADDR}/eco-funds`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(ecoFund),
    credentials: "include",
  });

  const ecoFundId = (await res.json()).ecoFundId;

  if (ecoFundId) {
    callback(ecoFundId);
  }
};

export const getEcoFundById = async (ecoFundId: string) => {
  const res = await fetch(`${BACKEND_ADDR}/eco-funds/${ecoFundId}`, {
    credentials: "include",
  });

  if (res.ok) {
    return await res.json();
  } else if (res.status === 404) {
    throw new Error("ecoFund not found");
  } else {
    throw new Error("Error fetching ecoFund");
  }
};

export const getEcoFunds = async (userId: string) => {
  const res = await fetch(`${BACKEND_ADDR}/eco-funds?userId=${userId}`, {
    credentials: "include",
  });
  return await res.json();
};

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     Projects Section                     */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export const createProject = async (
  project: Project,
  callback: (ecoFundId: string) => void
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

export const showcaseEcoFundProject = async (
  showcase: Showcase,
  callback: () => void
) => {
  const res = await fetch(`${BACKEND_ADDR}/showcase/${showcase.ecoFundId}`, {
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

export const getEcoFundProjects = async (ecoFundId: string) => {
  const res = await fetch(`${BACKEND_ADDR}/showcase/${ecoFundId}`, {
    credentials: "include",
  });

  return await res.json();
};

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                    Allocation Section                    */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

export const createEcoFundAllocation = async (
  ecoFundId: string,
  allocations: Allocation[],
  callback: () => void
) => {
  const res = await fetch(`${BACKEND_ADDR}/allocate/${ecoFundId}`, {
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

export const getEcoFundAllocations = async (ecoFundId: string) => {
  const res = await fetch(`${BACKEND_ADDR}/allocate/${ecoFundId}`, {
    credentials: "include",
  });

  return await res.json();
};
