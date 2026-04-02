# Agent Teams — Master Reference Guide

> Source: https://code.claude.com/docs/en/agent-teams  
> Requires: Claude Code v2.1.32+, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

---

## What Are Agent Teams?

Agent teams coordinate multiple Claude Code instances working together. One session acts as the **team lead** — it coordinates work, assigns tasks, and synthesizes results. **Teammates** work independently, each in their own context window, and can communicate directly with each other and with the lead.

Unlike subagents (which run inside a single session and only report back to the caller), teammates are fully independent sessions that share a task list and can message each other peer-to-peer.

---

## When to Use Agent Teams vs. Subagents

| | Subagents | Agent Teams |
|---|---|---|
| **Context** | Own context window; results return to caller | Own context window; fully independent |
| **Communication** | Report results back to main agent only | Teammates message each other directly |
| **Coordination** | Main agent manages all work | Shared task list with self-coordination |
| **Best for** | Focused tasks where only the result matters | Complex work requiring discussion and collaboration |
| **Token cost** | Lower — results summarized back to main context | Higher — each teammate is a separate Claude instance |

**Use subagents** when you need quick, focused workers that report back.  
**Use agent teams** when teammates need to share findings, challenge each other, and coordinate on their own.

### Strongest use cases for agent teams

- **Research and review** — multiple teammates investigate different aspects simultaneously, then challenge each other's findings
- **New modules or features** — teammates each own a separate piece without stepping on each other
- **Debugging with competing hypotheses** — teammates test different theories in parallel
- **Cross-layer coordination** — changes spanning frontend, backend, and tests, each owned by a different teammate

### When NOT to use agent teams

- Sequential tasks
- Same-file edits
- Work with many dependencies
- Routine or simple tasks (single session is more cost-effective)

---

## Enabling Agent Teams

Set in `.claude/settings.local.json` (project-local, not committed):

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Or set the environment variable directly in your shell.

---

## Starting a Team

Tell Claude what you want in natural language — it handles team creation, spawning, and coordination:

```
I'm designing a CLI tool that helps developers track TODO comments across
their codebase. Create an agent team to explore this from different angles:
one teammate on UX, one on technical architecture, one playing devil's advocate.
```

Claude will:
1. Create a team with a shared task list
2. Spawn teammates for each role
3. Have them explore the problem
4. Synthesize findings
5. Attempt to clean up the team when finished

---

## Architecture

| Component | Role |
|---|---|
| **Team lead** | The main Claude Code session — creates the team, spawns teammates, coordinates work |
| **Teammates** | Separate Claude Code instances, each working on assigned tasks |
| **Task list** | Shared list of work items that teammates claim and complete |
| **Mailbox** | Messaging system for inter-agent communication |

### Storage locations (auto-managed, do not edit by hand)

- Team config: `~/.claude/teams/{team-name}/config.json`
- Task list: `~/.claude/tasks/{team-name}/`

The team config holds runtime state (session IDs, tmux pane IDs) and is overwritten on every state update. Define reusable roles using subagent definitions instead.

---

## Display Modes

| Mode | Description | Requirements |
|---|---|---|
| **in-process** | All teammates run inside your main terminal. Use Shift+Down to cycle through. | Any terminal |
| **split panes** | Each teammate gets its own pane. See everyone's output at once. | tmux or iTerm2 |

Default is `"auto"` — uses split panes if already in tmux, in-process otherwise.

### Setting display mode globally (`~/.claude.json`):

```json
{
  "teammateMode": "in-process"
}
```

### Setting for a single session:

```bash
claude --teammate-mode in-process
```

### Installing split-pane dependencies

- **tmux**: install via your system package manager
- **iTerm2**: install the `it2` CLI, then enable Python API in iTerm2 → Settings → General → Magic

> Note: Split-pane mode is NOT supported in VS Code integrated terminal, Windows Terminal, or Ghostty.

---

## Controlling the Team

### Navigate teammates (in-process mode)

- **Shift+Down** — cycle through teammates (wraps back to lead after the last teammate)
- **Enter** — view a teammate's session
- **Escape** — interrupt a teammate's current turn
- **Ctrl+T** — toggle the task list

### Specify teammates and models

```
Create a team with 4 teammates to refactor these modules in parallel.
Use Sonnet for each teammate.
```

### Require plan approval before implementation

```
Spawn an architect teammate to refactor the authentication module.
Require plan approval before they make any changes.
```

Flow: teammate works in read-only plan mode → sends plan approval request to lead → lead approves or rejects with feedback → if rejected, teammate revises and resubmits → on approval, teammate begins implementation.

To influence the lead's approval judgment, give it criteria in your prompt:
- "only approve plans that include test coverage"
- "reject plans that modify the database schema"

### Talk to a teammate directly

In in-process mode, use Shift+Down to cycle to the teammate, then type to send a message.  
In split-pane mode, click into their pane.

### Assign tasks

- **Lead assigns**: tell the lead which task to give which teammate
- **Self-claim**: teammates pick up the next unassigned, unblocked task automatically after finishing one
- Task claiming uses file locking to prevent race conditions

### Task states

`pending` → `in progress` → `completed`

Tasks can have dependencies. A pending task with unresolved dependencies cannot be claimed until those dependencies complete. The system manages this automatically.

### Shut down a teammate

```
Ask the researcher teammate to shut down
```

The lead sends a shutdown request. The teammate can approve (exits gracefully) or reject with an explanation.

### Clean up the team

```
Clean up the team
```

Always use the lead to clean up — never a teammate. The lead checks for active teammates and fails if any are still running (shut them down first).

---

## Context and Communication

Each teammate loads project context automatically on spawn:
- CLAUDE.md files
- MCP servers
- Skills

The lead's conversation history does **not** carry over to teammates. Include all task-specific details in the spawn prompt.

### How teammates share information

- **Automatic message delivery** — messages delivered automatically to recipients; lead doesn't need to poll
- **Idle notifications** — when a teammate finishes and stops, it automatically notifies the lead
- **Shared task list** — all agents can see task status and claim available work

### Messaging types

- **message** — send to one specific teammate
- **broadcast** — send to all teammates simultaneously (use sparingly — cost scales with team size)

---

## Permissions

- Teammates start with the lead's permission settings
- If the lead runs with `--dangerously-skip-permissions`, all teammates do too
- You can change individual teammate modes after spawning
- You cannot set per-teammate modes at spawn time

---

## Using Subagent Definitions for Teammates

You can reference a named subagent type (from project, user, plugin, or CLI scope) when spawning a teammate. The teammate inherits that subagent's system prompt, tools, and model.

```
Spawn a teammate using the security-reviewer agent type to audit the auth module.
```

This lets you define a role once and reuse it as both a delegated subagent and an agent team teammate.

---

## Hooks for Quality Gates

| Hook | When it fires | How to use it |
|---|---|---|
| `TeammateIdle` | Teammate is about to go idle | Exit code 2 to send feedback and keep teammate working |
| `TaskCreated` | Task is being created | Exit code 2 to prevent creation and send feedback |
| `TaskCompleted` | Task is being marked complete | Exit code 2 to prevent completion and send feedback |

---

## Token Cost Guidance

Token usage scales with the number of active teammates — each has its own context window. General guidance:

- **Worth it**: research, review, new feature work with independent parallel tracks
- **Not worth it**: routine tasks, sequential work, simple single-file changes
- Start with 3–5 teammates — this balances parallel work with manageable coordination
- Aim for 5–6 tasks per teammate to keep everyone productive without excessive context switching

---

## Best Practices

### Give teammates enough context in the spawn prompt

```
Spawn a security reviewer teammate with the prompt: "Review the authentication
module at src/auth/ for security vulnerabilities. Focus on token handling,
session management, and input validation. The app uses JWT tokens stored in
httpOnly cookies. Report any issues with severity ratings."
```

### Choose team size wisely

- **3–5 teammates** is the recommended range for most workflows
- Token costs and coordination overhead both scale linearly with team size
- Three focused teammates often outperform five scattered ones
- Scale up only when work genuinely benefits from simultaneous parallel work

### Size tasks appropriately

- **Too small** — coordination overhead exceeds the benefit
- **Too large** — teammates work too long without check-ins, risking wasted effort
- **Just right** — self-contained units with a clear deliverable (a function, a test file, a review)

If the lead isn't creating enough tasks, ask it to split the work into smaller pieces.

### Avoid file conflicts

Two teammates editing the same file leads to overwrites. Break the work so each teammate owns a different set of files.

### Prevent the lead from doing work instead of delegating

```
Wait for your teammates to complete their tasks before proceeding
```

### Use CLAUDE.md for shared guidance

Teammates read CLAUDE.md from their working directory automatically — use this to provide project-specific guidance to all teammates without repeating it in every spawn prompt.

### Start with research/review tasks when new to agent teams

These tasks have clear boundaries, don't require writing code, and show the value of parallel exploration without coordination challenges.

### Monitor and steer

Check in on teammates' progress, redirect approaches that aren't working, and synthesize findings as they come in. Letting a team run unattended too long increases the risk of wasted effort.

---

## Example Prompts

### Parallel code review

```
Create an agent team to review PR #142. Spawn three reviewers:
- One focused on security implications
- One checking performance impact
- One validating test coverage
Have them each review and report findings.
```

### Competing hypothesis debugging

```
Users report the app exits after one message instead of staying connected.
Spawn 5 agent teammates to investigate different hypotheses. Have them talk to
each other to try to disprove each other's theories, like a scientific
debate. Update the findings doc with whatever consensus emerges.
```

### Exploratory design research

```
I'm designing a CLI tool that helps developers track TODO comments across
their codebase. Create an agent team to explore this from different angles:
one teammate on UX, one on technical architecture, one playing devil's advocate.
```

---

## Troubleshooting

| Problem | Solution |
|---|---|
| Teammates not appearing | In in-process mode, press Shift+Down — they may already be running. Check that the task is complex enough to warrant a team. |
| Too many permission prompts | Pre-approve common operations in permission settings before spawning teammates. |
| Teammate stops on error | Use Shift+Down to view their output; give them additional instructions directly or spawn a replacement. |
| Lead shuts down before work is done | Tell it to keep going; instruct it to wait for teammates before proceeding. |
| Orphaned tmux sessions | `tmux ls` then `tmux kill-session -t <session-name>` |
| Task appears stuck | Check if work is actually done; manually update task status or tell the lead to nudge the teammate. |

---

## Known Limitations (Experimental)

- **No session resumption with in-process teammates** — `/resume` and `/rewind` do not restore in-process teammates; lead may try to message teammates that no longer exist (spawn new ones)
- **Task status can lag** — teammates sometimes fail to mark tasks complete, blocking dependent tasks
- **Slow shutdown** — teammates finish their current request/tool call before shutting down
- **One team per session** — a lead can only manage one team at a time
- **No nested teams** — teammates cannot spawn their own teams or teammates
- **Lead is fixed** — cannot promote a teammate to lead or transfer leadership
- **Permissions set at spawn** — all teammates start with lead's permission mode; can't set per-teammate modes at spawn time
- **Split panes require tmux or iTerm2** — not supported in VS Code integrated terminal, Windows Terminal, or Ghostty

---

## Quick Reference Card

```
Enable:      CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1
Version req: claude --version (need v2.1.32+)
Navigate:    Shift+Down (cycle teammates), Ctrl+T (task list)
Cleanup:     "Clean up the team" (always via lead, never a teammate)
Team size:   3–5 teammates, 5–6 tasks per teammate
Storage:     ~/.claude/teams/ and ~/.claude/tasks/ (auto-managed)
```
