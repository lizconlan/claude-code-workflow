---
description: Run full end-to-end demo to build app
---

IMPORTANT: Never use compound bash commands (&&, ||, ;). Always run each bash command as a separate tool call. This is safety issue, required for permission compatibility.

When complete, output this message exactly:

> **Preflight checks**

  For best results, run with --permission-mode acceptEdits

  Please type GO to start, I'll take it from here (type anything else to stop)

Wait for user to type GO, QUIT IMMEDIATELY IF THERE IS ANY OTHER RESPONSE

SKIP ALL GO AND APPROVAL STEPS AFTER THIS POINT

/analyse --fast
/build --fast
