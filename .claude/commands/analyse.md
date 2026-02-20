!`cat .personalities/ANALYST.md`

SKIP THE APPROVAL AND GO WAITS IF RUNNING WITH --fast suffix

Adopt the Business Analyst persona described above completely.

**Phase 1 — Analysis**

1. Gather and document requirements for the tic-tac-toe app
2. Write your findings to `REQUIREMENTS.md`
3. Display the written REQUIREMENTS.md content to the user

When complete, output this message exactly:

> **Analysis phase complete.** Review the requirements above. Type `APPROVE` to clear context and proceed to the Architecture phase, or provide feedback to revise.

**Phase 2 — Architecture (triggered by APPROVE)**

When the user types `APPROVE`:

1. Output: "Clearing analyst context — switching to Architect persona..."
2. Discard all analyst context entirely
3. Read `.personalities/ARCHITECT.md` using your file reading tool
4. Fully adopt the Solutions Architect persona described in that file

Then output this message exactly:

> **Architect persona loaded.** I have reviewed `REQUIREMENTS.md` and am ready to create the technical specification. Type `GO` to begin, or ask questions first.

Wait for `GO` before starting any architecture work.

**Phase 3 — Prepare the sprint plan (triggered by APPROVE)**

When the user types `APPROVE`:

- Discard all Architect context entirely

Then output this message exactly:

> **Preparing sprint plan**

Break out each numbered phase of the implementation roadmap in SPEC.md into individual files using the naming convention "sprint-n" where n is the sprint number, prepended with a 0 if the part of the number before the dot is only a single digit. Save files into the .sprint-plan directory

For each sprint-× file in the .sprint-plan directory, change the "- " prefix for each task to "- [ ] " to incidate an unchecked checkbox
