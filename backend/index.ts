import * as cheerio from "cheerio";
import express from "express";
import Session from "express-session";
import { generateNonce, SiweErrorType, SiweMessage } from "siwe";
var cors = require("cors");

import db from "./db";

const app = express();
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(
  Session({
    name: "dekan-capital",
    secret: "dekan-capital-secret",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false, sameSite: true },
  })
);

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*           SIWE Authentication and Verification           */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

app.get("/", (req, res) => {
  res.send("Welcome to Sentiment Drips!");
});

app.get("/nonce", async function (req, res) {
  req.session.nonce = generateNonce();
  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(req.session.nonce);
});

app.post("/verify", async function (req, res) {
  try {
    if (!req.body.message) {
      res
        .status(422)
        .json({ message: "Expected prepareMessage object as body." });
      return;
    }

    let SIWEObject = new SiweMessage(req.body.message);
    const { data: message } = await SIWEObject.verify({
      signature: req.body.signature,
      nonce: req.session.nonce,
    });

    req.session.siwe = message;
    req.session.cookie.expires = new Date(message.expirationTime!);
    req.session.save(() => {
      const query = "SELECT * FROM Users WHERE address = ?";
      const params = [req.session.siwe?.address];

      db.all(query, params, (err, rows) => {
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }

        res.json(
          rows[0] || {
            name: "",
            address: req.session.siwe?.address,
            avatarURL: "",
          }
        );
      });
    });
  } catch (e) {
    req.session.siwe = undefined;
    req.session.nonce = undefined;
    console.error(e);
    switch (e) {
      case SiweErrorType.EXPIRED_MESSAGE: {
        const error = e as unknown as Error;
        req.session.save(() =>
          res.status(440).json({ message: error.message })
        );
        break;
      }
      case SiweErrorType.INVALID_SIGNATURE: {
        const error = e as unknown as Error;
        req.session.save(() =>
          res.status(422).json({ message: error.message })
        );
        break;
      }
      default: {
        const error = e as unknown as Error;
        req.session.save(() =>
          res.status(500).json({ message: error.message })
        );
        break;
      }
    }
  }
});

app.get("/logout", (req, res) => {
  req.session.destroy((e) => {
    const error = e as unknown as Error;
    error && console.error("logout error: ", error);
  });
  res.setHeader("Content-Type", "text/plain");
  res.send(`You have been logged out`);
});

app.get("/session", function (req, res) {
  if (!req.session.siwe) {
    res.json({
      authenticated: false,
    });
    return;
  }
  const query = "SELECT * FROM Users WHERE address = ?";
  const params = [req.session.siwe?.address];

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(
      {
        ...(rows[0] as Object),
        address: req.session.siwe?.address,
        chainId: req.session.siwe?.chainId,
      } || {
        name: "",
        avatarURL: "",
        address: req.session.siwe?.address,
        chainId: req.session.siwe?.chainId,
      }
    );
  });
});

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                       User Section                       */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

// Create a new user
app.post("/users/new-user", (req, res) => {
  if (!req.session.siwe) {
    res.status(401).json({ message: "You have to first sign_in" });
    return;
  }

  // Assuming you have a JSON request body with user information
  const { name, avatarURL } = req.body;

  // Insert the new user into the Users table
  const insertQuery = `
    INSERT INTO Users (name, address, avatarURL)
    VALUES (?, ?, ?)
    ON CONFLICT (address)
    DO UPDATE SET name = excluded.name, avatarURL = excluded.avatarURL
  `;

  db.run(
    insertQuery,
    [name, req.session.siwe.address, avatarURL],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        console.error(err);
        return;
      }

      res.json({
        message: "User created successfully",
        userId: this.lastID,
      });
    }
  );
});

// Read a single user filtered by ID
app.get("/users/:userId", (req, res) => {
  const { userId } = req.params;

  const selectQuery = `
    SELECT * FROM Users
    WHERE userId = ?
  `;

  db.get(selectQuery, [userId], (err, poolFund) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!poolFund) {
      res.status(404).json({ message: "user not found" });
      return;
    }

    res.json(poolFund);
  });
});

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     PoolFunds Section                     */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

// Create a new poolFund
app.post("/pool-funds", (req, res) => {
  if (!req.session.siwe) {
    res.status(401).json({ message: "You have to first sign_in" });
    return;
  }

  const {
    emoji,
    title,
    detail,
    strategyAddress,
    createdAt,
  } = req.body;

  const insertQuery = `
    INSERT INTO PoolFunds (createdBy, allocationProposalId, emoji, title, detail, strategyAddress, createdAt)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;

  db.run(
    insertQuery,
    [
      req.session.siwe.address,
      "",
      emoji,
      title,
      detail,
      strategyAddress,
      createdAt,
    ],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        console.log(err);
        return;
      }

      res.json({
        message: "poolFund created successfully",
        poolFundId: this.lastID,
      });
    }
  );
});

// Read a single poolFund filtered by ID
app.get("/pool-funds/:poolFundId", (req, res) => {
  const { poolFundId } = req.params;

  const selectQuery = `
    SELECT * FROM PoolFunds
    WHERE poolFundId = ?
  `;

  db.get(selectQuery, [poolFundId], (err, poolFund) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!poolFund) {
      res.status(404).json({ message: "poolFund not found" });
      return;
    }

    res.json(poolFund);
  });
});

// Read all poolFunds with optional filtering by userId
app.get("/pool-funds", (req, res) => {
  const { userId } = req.query;

  const query = userId
    ? "SELECT * FROM PoolFunds WHERE createdBy = ?"
    : "SELECT * FROM PoolFunds";
  const params = userId ? [userId] : [];

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(rows);
  });
});

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     Projects Section                     */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

// Create a new project
app.post("/projects", (req, res) => {
  if (!req.session.siwe) {
    res.status(401).json({ message: "You have to first sign_in" });
    return;
  }

  const { tokensRequested, emoji, title, description } = req.body;
  const insertQuery = `
    INSERT INTO Projects (createdBy, tokensRequested, emoji, title, description)
    VALUES (?, ?, ?, ?, ?)
  `;

  db.run(
    insertQuery,
    [req.session.siwe.address, tokensRequested, emoji, title, description],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({
        message: "Project created successfully",
        projectId: this.lastID,
      });
    }
  );
});

// Read a single project filtered by ID
app.get("/projects/:projectId", (req, res) => {
  const { projectId } = req.params;

  const selectQuery = `
    SELECT * FROM Projects
    WHERE projectId = ?
  `;

  db.get(selectQuery, [projectId], (err, project) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!project) {
      res.status(404).json({ message: "Project not found" });
      return;
    }

    res.json(project);
  });
});

// Read all projects with optional filtering by user
app.get("/projects", (req, res) => {
  const { userId } = req.query;

  const query = userId
    ? "SELECT * FROM Projects WHERE createdBy = ?"
    : "SELECT * FROM Projects";
  const params = userId ? [userId] : [];

  db.all(query, params, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(rows);
  });
});

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                     Showcase Section                     */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

// Create a new showcase
app.post("/showcase/:poolFundId/:projectId", (req, res) => {
  if (!req.session.siwe) {
    res.status(401).json({ message: "You have to first sign_in" });
    return;
  }

  const { poolFundId } = req.params;
  const { projectId, recipientId, status } = req.body;

  const insertQuery = `
    INSERT INTO ShowcasedProjects (poolFundId, projectId,  recipientId, status)
    VALUES (?, ?, ?, ?)
  `;

  db.run(
    insertQuery,
    [poolFundId, projectId, recipientId, status],
    function (err) {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }

      res.json({ message: "Project added to showcased projects successfully" });
    }
  );
});

// Read all showcased project under an poolFund
app.get("/showcase/:poolFundId", (req, res) => {
  const { poolFundId } = req.params;
  const selectQuery = `
    SELECT P.*
    FROM Projects P
    INNER JOIN ShowcasedProjects SP ON P.projectId = SP.projectId
    WHERE SP.poolFundId = ${poolFundId}
  `;

  db.all(selectQuery, (err, projects) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(projects);
  });
});

// TODO: Verify accepted showcases projects

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                    Allocation Section                    */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

// Create and edit allocations under an poolFund (expects an array of allocations)
app.put("/allocate/:poolFundId", (req, res) => {
  if (!req.session.siwe) {
    res.status(401).json({ message: "You have to first sign_in" });
    return;
  }

  const { poolFundId } = req.params;
  const allocations: { amount: number; projectId: string }[] = req.body; // Expecting an array of allocation objects

  if (!Array.isArray(allocations)) {
    res.status(400).json({
      error: "Invalid request body format. Expected an array of allocations.",
    });
    return;
  }

  // Calculate the total amount of all allocations
  const totalAllocation = allocations.reduce((total, allocation) => {
    return total + parseFloat(allocation.amount as any);
  }, 0);

  // Check if the total allocation exceeds the poolFund's tokenAmount
  const checkQuery = `SELECT tokenAmount FROM PoolFunds WHERE poolFundId = ${poolFundId}`;
  db.get(checkQuery, (err, poolFund: any) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    if (!poolFund) {
      res.status(404).json({ error: "poolFund not found" });
      console.log("err2");

      return;
    }

    if (totalAllocation > poolFund.tokenAmount) {
      res
        .status(400)
        .json({ error: "Total allocation exceeds poolFund tokenAmount" });
      return;
    }

    const sql = `
    INSERT INTO AllocatedProjects (allocatedBy, poolFundId, projectId, amount)
    VALUES (?, ?, ?, ?)
    ON CONFLICT (allocatedBy, poolFundId, projectId)
    DO UPDATE SET amount = excluded.amount
    `;

    // Begin a transaction
    db.serialize(() => {
      db.run("BEGIN TRANSACTION");

      try {
        allocations.forEach((allocation) => {
          const { projectId, amount } = allocation;
          db.run(sql, [
            req.session.siwe?.address,
            poolFundId,
            projectId,
            amount,
          ]);
        });

        // Commit the transaction if all insertions are successful
        db.run("COMMIT");
        res.json({ message: "Allocations updated successfully!" });
      } catch (error) {
        // Rollback the transaction if there's an error
        db.run("ROLLBACK");
        console.error("Transaction rolled back due to an error:", error);
        res.status(500).json({ error });
      }
    });
  });
});

// Read all allocators and their allocations under a specific poolFund
app.get("/allocate/:poolFundId", (req, res) => {
  const { poolFundId } = req.params;
  const selectQuery = `
    SELECT U.name AS allocatorName, U.address AS allocatorAddress,
           AP.projectId AS allocatedProjectId, AP.amount AS allocationAmount,
           P.title AS projectTitle, P.createdBy AS projectCreatedBy
    FROM AllocatedProjects AP
    INNER JOIN Users U ON AP.allocatedBy = U.address
    INNER JOIN Projects P ON AP.projectId = P.projectId
    WHERE AP.poolFundId = ${poolFundId}
  `;

  db.all(selectQuery, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    console.log(results);

    // Organize the results into the desired JSON structure
    const allocatorsMap = new Map(); // Map to group allocators and their allocations
    results.forEach((row) => {
      const {
        allocatorName,
        allocatorAddress,
        allocatedProjectId,
        allocationAmount,
        projectTitle,
        projectCreatedBy,
      } = row as any;

      if (!allocatorsMap.has(allocatorName)) {
        // Create a new allocator entry if it doesn't exist in the map
        allocatorsMap.set(allocatorName, {
          name: allocatorName,
          address: allocatorAddress,
          allocated: [],
        });
      }

      // Add allocation details to the allocator's allocated array
      const allocator = allocatorsMap.get(allocatorName);
      allocator.allocated.push({
        projectId: allocatedProjectId,
        amount: allocationAmount,
        title: projectTitle,
        createdBy: projectCreatedBy,
      });
    });

    // Convert the map values to an array to match the specified signature
    const allocatorsArray = Array.from(allocatorsMap.values());

    res.json(allocatorsArray);
  });
});

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                       Table Helper                       */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

// Custom function to edit table content regardless of the frontend
app.post("/edit-table", (req, res) => {
  let query = `DROP TABLE table_name`;

  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }

    res.json(rows);
  });
});

/*´:°•.°+.*•´.*:˚.°*.˚•´.°:°•.°•.*•´.*:˚.°*.˚•´.°:°•.°+.*•´.*:*/
/*                  EditorJS Link Previewer                  */
/*.•°:°.´+˚.*°.˚:*.´•*.+°.•°:´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•*/

app.get("/fetchUrl", async (req, res) => {
  let url = req.query.url as string;
  let resHTML = await fetch(new URL(url)).catch((e) => console.log(e));

  if (!resHTML) {
    res.status(500).json({
      success: 0,
      meta: {},
    });
    return;
  }

  const html = await resHTML.text();
  const $ = cheerio.load(html);

  // custom meta-tag function
  const getMetaTag = (value: string) => {
    return (
      $(`meta[name=${value}]`).attr("content") ||
      $(`meta[property="og:${value}"]`).attr("content") ||
      $(`meta[property="twitter:${value}"]`).attr("content")
    );
  };

  const metadataObject = {
    success: 1,
    meta: {
      title: $("title").first().text(),
      description: getMetaTag("description"),
      image: {
        url: getMetaTag("image"),
      },
    },
  };
  res.send(metadataObject);
  return;
});

module.exports = app;

declare module "express-session" {
  interface SessionData {
    nonce: string;
    siwe: SiweMessage;
  }
}
