## How to Write Better AI Skills

I’m a software engineer building a data verification platform for machine learning companies. Exploring concepts like evals and AI judges at work got me wondering: how could I apply them to the everyday tasks I use AI for?

When you ask AI to write something, you often end up explaining what you want through corrections: make it shorter, include the missing detail, or stop sounding so formal. You can save those preferences in an AI skill, a reusable set of instructions for a recurring job, so you do not have to repeat yourself every time.

But how do you know a change actually helped? One answer might improve while another gets worse. I wanted a more repeatable way to refine skills and make their answers consistently meet the same requirements.

I wrote “Fine Tune Your Skills” to make that easier to check. It shows you examples of your skill’s work and asks what you would change. You give feedback in your own words, one example at a time, until you think the results consistently look good.

It then turns that feedback into tests called **evaluations**, or **evals**. An eval checks whether AI did something you care about, such as including the reason a project was delayed or avoiding a deadline you never provided. Many different answers can pass the same test.

The name is a riff on fine-tuning in machine learning, where an AI model receives additional training to improve at a task. Developers use evals to check whether that training helped. “Fine Tune Your Skills” applies that idea to the written instructions: change them, try the same tasks again, and check whether the answers improve.

I tried it on my “Write Like a Human” skill. An example blamed a database rule without explaining the failure. After my feedback, it explained that the rule prohibited missing values, so existing records needed those values filled in before the rule could be applied.

That feedback became reusable checks for explanations: does the answer explain how something works or why something happened, rather than merely name it?

An AI judge checks whether each answer meets your requirements. It reads the task and the answer, marks each check as a pass or fail, and explains why. You can review those reasons because the judge can make mistakes too.

Once you approve the checks, “Fine Tune Your Skills” tests your current skill, rewrites its instructions, and tries the same tasks again. The tasks and checks stay the same so it can compare the results fairly. A revision is kept only if it passes more checks without failing any it previously passed. It tries up to five revisions, then gives you the best version and the tests to use again.

This makes refinement more systematic: the same tasks, the same requirements, and an explicit rule for accepting changes. Code can check objective requirements deterministically, meaning the same answer always gets the same result. The goal is to get results from your skill that you can rely on, instead of writing it once and hoping it works.
