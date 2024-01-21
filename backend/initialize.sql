-- Table for users
CREATE TABLE Users (
    userId INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT NOT NULL,
    avatarURL TEXT NOT NULL,
    UNIQUE (address)
);

-- Table for PoolFunds
CREATE TABLE PoolFunds (
    poolFundId INTEGER PRIMARY KEY,
    createdBy TEXT NOT NULL,
    allocationProposalId TEXT NOT NULL,
    emoji TEXT NOT NULL,
    title TEXT NOT NULL,
    detail TEXT NOT NULL,
    strategyAddress TEXT NOT NULL,
    createdAt INTEGER NOT NULL,
    FOREIGN KEY (createdBy) REFERENCES Users(address)
);

-- Table for allocated projects within allocators
CREATE TABLE AllocatedProjects (
    allocationId INTEGER PRIMARY KEY,
    allocatedBy TEXT NOT NULL,
    poolFundId INTEGER NOT NULL,
    projectId INTEGER NOT NULL,
    amount REAL NOT NULL,
    FOREIGN KEY (allocatedBy) REFERENCES Users(address),
    FOREIGN KEY (poolFundId) REFERENCES PoolFunds(poolFundId),
    FOREIGN KEY (projectId) REFERENCES Projects(projectId),
    UNIQUE (allocatedBy, poolFundId, projectId)
);

-- Table for projects
CREATE TABLE Projects (
    projectId INTEGER PRIMARY KEY,
    createdBy TEXT NOT NULL,
    emoji TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    FOREIGN KEY (createdBy) REFERENCES Users(address)
);

-- Table for projects showcase
-- /// @notice The Status enum that all recipients are based from
-- enum Status {
--     None,
--     Pending,
--     Accepted,
--     Rejected,
--     Appealed,
--     InReview,
--     Canceled
-- }
CREATE TABLE ShowcasedProjects (
    showcaseId INTEGER PRIMARY KEY,
    poolFundId INTEGER NOT NULL,
    projectId INTEGER NOT NULL,
    recipientId TEXT NOT NULL,
    tokensRequested REAL NOT NULL,
    status INTEGER NOT NULL,
    FOREIGN KEY (poolFundId) REFERENCES PoolFunds(poolFundId),
    FOREIGN KEY (projectId) REFERENCES Projects(projectId)
);