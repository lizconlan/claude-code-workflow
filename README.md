# Taming the Context Window

## The Problem This Solves

When trying to build something non-trivial with an AI coding agent, it's tempting to dump everything into one big prompt and let it run. The problem is that a detailed spec can easily overflow the context window, causing the agent to lose track of earlier decisions, repeat work, or go off-script entirely.

A workflow can solve this by doing two things:

1. Structuring the planning output - requirements and architecture are written to files, not just held in context
1. Chunking the work - the spec is automatically broken into sprint files, so the developer agent only needs to load one sprint at a time

The agent always has exactly the context it needs, no more, no less. And if something goes wrong mid-build, it can pick up from the right sprint file rather than starting over. (Individual tasks can be checked off as they're completed so it should be able to figure out where it got to.)

If you hear people talking about "spec-driven development", this is the kind of thing they mean - creating a specification document upfront to tell the agent what to do rather than jumping straight into an interactive session and figuring it out as you go. (Although it's quite common to do a mixture of both if the agent doesn't quite do what you wanted, or you just changed your mind when you saw it and "actually, that blue was a mistake - could you change it back to grey after all?" enters the chat.)

In this case the Architect role uses the OpenSpec framework to structure its output. Other frameworks are available  and your future employer will likely pick for you but while you're just exploring what's possible, you get to use whatever you like.

## What This Repo Demonstrates

A complete workflow for AI-assisted app creation, split into three commands:

`/analyse`

Runs two roles in sequence:

* The Business Analyst gathers requirements and writes them to `REQUIREMENTS.md`
* The Solutions Architect reads those requirements and produces a technical spec in `SPEC.md`

Once the spec exists, it's automatically split into numbered sprint files in `.sprint-plan/`, each containing individual tasks formatted as checkboxes. This is what keeps the build phase manageable.

Each phase pauses for review before proceeding; you can read the output, provide feedback, and only move on when you're happy with it.

`/build`

Hands the Developer role one sprint file at a time containing just a handful of small tasks to complete rather than trying to consume what could be thousands of lines of text with exec summaries and sidebar notes that it doesn't need to hold in context.

The Developer:

* Works through each task using TDD, committing after each increment
* Marks tasks as done in the sprint file as it goes (preserving state if anything goes wrong)
* Checks its assumptions against the spec — if it assumes something that contradicts the plan, the spec wins

![The Developer role announcing "Hello, I will be your React developer for today." followed immediately by a self-correction: "Actually, per the spec, this is a vanilla HTML/CSS/JS app (no framework needed)."](https://github.com/user-attachments/assets/fb7f4dc9-2ba6-452c-ae19-6dbb237a5ee6)
<br>

The `--fast` flag skips the approval pauses and runs as autonomously as possible.

`/demo`

Runs `/analyse` and `/build` back to back with minimal interruption. It asks you to type GO before starting — so that opening the command by accident doesn't immediately kick off an automated run, then takes it from there.

Intended for showing off what the workflow can do rather than as a day-to-day tool.

For best results, run with `--permission-mode acceptEdits`.

## The Buildable Project

I picked Tic-Tac-Toe as a deliberately simple example for the tool to build, partly as it's a familiar problem so an agent can build it without needing too much in the way of description but also with cost in mind. AI powered software is not for free and most tools at this point have a per token cost. Although, at time of writing, the example project as-is can be run on the basic Claude Pro month-to-month plan and the version in the demo video only took 9% of the session I was working in to run (I used Sonnet 4.6 with Medium Effort).

The slightly awkward trade-off is that this way of working is better suited to a larger project but I really wanted the example build to be instantly recognisable and, more importantly, something that could be built in under 10 minutes without costing a fortune.

## See it in Action

That said, if you don't want to build it yourself, that's fine - browse the code, check the sample output in [the PRs](../../pulls), or watch the video below to see it run end to end without incurring any cost.

https://github.com/user-attachments/assets/4ee859f2-2d98-47bf-86e4-f6b1a09d8f91

## How the Files Fit Together

```
.claude/commands/     # The three commands: analyse, build, demo
.roles/               # Role definitions for Analyst, Architect and Developer
.sprint-plan/         # Auto-generated sprint files (created by /analyse)
REQUIREMENTS.md       # Auto-generated by the Analyst role
SPEC.md               # Auto-generated by the Architect role
```

## Try It Yourself

Fork this repo, swap out the tic-tac-toe references in `.roles/ANALYST.md` for something you actually want to build, and see what happens. If it goes sideways, just delete the generated files and start over - that's what it's there for.

The sprint files mean you'll rarely need to start from scratch entirely. If the build stalls halfway through, the completed tasks are already committed and marked done. Pick it back up from where it left off.

Not sure where to start? Here are a few ways to experiment once you've run the demo:

**Steer the output more deliberately**
The demo leaves some choices open - colours, layout details - and the agent fills the gaps itself. Try being more specific: tell the Analyst you want a particular colour scheme, or a specific visual style, and see how that flows through into the final result.

**Iterate on what's already there**
Once the app is built, you can keep going in Claude Code. Ask it to add a dark mode toggle, or to use a specific blue and red for the X's and O's that work well in both light and dark themes. You don't have to start over to extend what the workflow produced.

**Start over with better instructions**
Throw away the generated code and rerun `/demo` with a richer brief. Adding something like "give it a dark mode toggle" to the Analyst prompt - and again, steering the colour choides - will get you much closer to a finished result first time. Compare the two outputs.

**Replace the project entirely**
Swap out the tic-tac-toe brief in `.roles/ANALYST.md` for something you actually want to build. Keep it small to start - the workflow is designed for projects that fit comfortably within a single session.
