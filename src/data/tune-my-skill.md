---
name: fine-tune-your-skills
description: Tune an existing skill through written feedback on realistic outputs, a confirmed taste rubric, an untouched baseline, and a frozen evaluation suite. Use when the user asks to tune a skill or improve its output against their preferences.
---

# Fine Tune Your Skills

Improve the user's selected skill through observed output quality. Separate taste collection from evaluation and editing. A request to create or install this tuner does not itself start tuning another skill.

## Establish the target and preserve the original

Resolve the target SKILL.md and read its supporting resources. Ask for the target only if it is unclear. Record its path, save an exact original copy and content hash, and preserve any supporting resources needed to reproduce its behavior. Keep run artifacts in a dedicated workspace directory, outside the installed skill.

Track the current phase, verbatim feedback, working hypotheses, confirmed rubric, frozen suite hash, generation and judging settings, completed iterations, and best version. Resume from this record without silently restarting the iteration budget. Do not edit the target during taste collection or before the baseline is complete.

## Collect taste one output at a time

Present one realistic task with its purpose, audience, relevant facts, and requested deliverable, followed by exactly one candidate output. Examples must represent work someone would actually request: for example, explaining a failed staging migration to a product lead who needs to decide whether a release can proceed. Supply enough facts to evaluate accuracy; do not invent operational facts inside the answer.

Ask only for free-form written feedback, such as “What would you change?” Do not offer multiple-choice answers, ratings, rankings, A/B alternatives, or batches of examples. Use a free-text question tool without options if one is available; otherwise ask in chat and wait.

After each reply, record the user's words and translate them into provisional working hypotheses. Apply those hypotheses to the next example, through generation instructions held separately from the target skill. Use a revision when it helps test a correction, then vary the realistic task to see whether the preference generalizes. Never treat these adapted examples as the untouched baseline.

There is no fixed example count. Continue until the user says the outputs look consistently good or otherwise explicitly asks to end taste collection. Approval of one example alone does not establish consistency across outputs. Do not infer completion from silence or from your own judgment. If the user already supplied an explicit stopping signal and usable feedback, carry them forward rather than repeating collection.

## Infer and confirm a concise rubric

Once taste collection ends, infer a short set of distinct, observable criteria from the feedback. Explain each criterion in a sentence and ask the user to confirm or correct the rubric in their own words. Wait for that confirmation before freezing the suite or editing the target. Do not manufacture confirmation from an assistant's prior summary.

For technical writing, preserve the dogfooding lessons where relevant:

- Preserve technical specificity that materially explains the subject.
- Explain mechanisms: when naming a technical cause, constraint, failure, or concept, explain what actually happens and why it matters or causes the result.
- Stay concise by excluding unrelated details, not by removing necessary substance.
- Write naturally with clear, connected sentences and explain unfamiliar precise terms rather than substituting vague language.

Plain English does not mean less technical. Simplify the language, not the substance. For example, a useful migration explanation says that existing rows contain null values and that a NOT NULL constraint forbids those values, so the database rejects the change. Merely naming a “constraint issue” does not explain the failure. Do not force technical criteria onto tasks where they are inapplicable or impose this example as a required answer template.

## Freeze a reusable evaluation suite

Before any target edits, save a versioned suite that another run can execute without the taste conversation. Choose coverage to match the target's purposes rather than a fixed test count. Include representative tasks, new tasks beyond the taste examples, and cases likely to expose tradeoffs such as brevity versus necessary technical detail.

For each case, save a stable ID, exact task prompt, audience and purpose, complete input facts or fixtures, applicable criteria, and factual or behavioral requirements. Keep approved examples as reference evidence, not answers to copy. Save the confirmed rubric with explicit pass/fail anchors and any predeclared critical requirements.

Freeze the generation configuration, judge instructions, criterion applicability, scoring, and acceptance rule alongside the inputs. Record model and settings where available and any limitations. Use criterion-by-criterion pass/fail judgments with cited output evidence; score the proportion of applicable case/criterion pairs that pass. A meaningful improvement requires at least one additional passing pair, no previously passing pair becoming a failure, and no new factual or critical failure. Keep the incumbent on ties. If repeated samples are needed to control variability, decide their number and comparison method before the baseline and use them for every version.

Hash the suite and preserve it unchanged throughout the run. Never remove difficult cases, relax thresholds, or rewrite criteria to make a candidate pass. If the user changes requirements, explicitly create a new suite version and establish a new baseline; do not compare scores across different suites as improvement.

## Establish the untouched baseline

Generate fresh outputs for every frozen case using only the original target skill, its necessary resources, and the frozen case inputs and generation setup. Exclude taste hypotheses, proposed edits, rubric coaching, and prior candidate outputs from generation context. Use isolated generation contexts when available. If isolation is unavailable, disclose contamination risk and do not present the run as a controlled baseline.

Judge each criterion independently against the saved rubric and facts. Judges should receive the task, output, and criterion, without the version label, proposed edits, or previous scores. Use separate judging contexts when available; never replace evidence with the editor's expectation of improvement. Record any lack of independence.

Save all baseline outputs, judgments, evidence, and aggregate results. Verify the target still matches the original hash. If generation or judging is blocked, preserve the original and report the blocker; do not fabricate scores or proceed with unevaluated edits.

## Automatically edit and evaluate, at most five times

After rubric confirmation and a complete baseline, proceed without asking for approval on each ordinary target edit. Honor actual filesystem permissions and the user's authorized scope. Tune SKILL.md itself, not merely a proposed diff or a temporary prompt. Preserve unrelated guidance and metadata; do not modify other skills or supporting resources without a task-specific reason and authorization.

Start with the original as the best version. For each iteration, up to five total attempted revisions:

1. Inspect failed evaluations from the best version and form a concrete explanation of which target instruction caused the failure or what guidance is missing.
2. Save the best version, then edit the actual target SKILL.md narrowly to address that failure. Record the hypothesis, diff, and candidate hash. Do not embed test-specific answers or add special cases merely to satisfy known prompts.
3. Regenerate every output in the full frozen suite from scratch using the candidate skill and identical generation setup. Do not reuse or hand-edit baseline outputs, and do not rerun only failed cases.
4. Rerun every applicable judgment using the frozen evaluation setup. Save the complete outputs, evidence, scores, and comparison with both the baseline and the best version.
5. Retain the candidate only if it meets the frozen improvement rule. If any previously passing pair fails, a critical or factual regression appears, or results tie or worsen, restore the best version before another attempt. An incomplete or interrupted candidate evaluation cannot replace the best; restore it and record the attempt.

Stop at five attempted revisions, when all requirements pass, or earlier when remaining failures offer no concrete change likely to yield meaningful improvement. A rejected candidate may justify a different targeted attempt if evidence supports one; do not continue with cosmetic rewrites. Failed or reverted attempts still count toward five. Never reset the budget to continue the same run.

Finish with the best evaluated version installed at the target path, including the untouched original if no candidate improved it. Verify its content hash against the saved best version. Preserve the original, frozen suite, candidate versions, outputs, judgments, diffs, and run record so the comparison is reusable and reversible. Do not overwrite concurrent user edits; preserve the evaluated version separately and resolve the conflict with the user.

## Report the result

Briefly state what changed in the target, baseline versus best results, attempted iterations, and why the run stopped. Provide the target and reusable evaluation artifacts. Distinguish measured improvements from hypotheses and mention reverted regressions or failed checks. Include a “Not checked” sentence covering anything not exercised, such as fresh-session skill discovery or behavior outside the frozen suite. Never claim that structural validation proves output quality.
