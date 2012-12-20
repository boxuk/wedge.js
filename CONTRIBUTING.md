How to contribute
=================

Notes
-----
- Never force push branch `master`. Unless you know what you are doing!
- Be cautious when you are sharing a branch. If you share a branch please read
  the section below.
- If working form a ticket, prefix your branch name with the ticket number e.g. 17584-feature-x

Adding a feature
----------------

- Branch from master - `git fetch origin` `git checkout -b feature-x origin/master`
- Push to github - `git push origin feature-x`
- Master updated? rebase onto master - `git fetch origin` `git checkout feature-x` `git rebase origin/master`
- Update github `git push origin feature-x --force`
- Ready for a pull request? Create one
- Master updated again?! - `git fetch origin` `git rebase origin/master` `git push origin feature-x --force`
- Wait for PR build to be green and make sure this is for latest master, because
  PR builds wont automatically update when master changes.

Trivial changes
--------------

This should only be used for trivial changes because once it is commited and
pushed to origin you should never rewrite history. Working on master could
break the CI build however you could run the appropriate tests on your machine
before pushing to origin.

- Commit on master
- `git fetch origin`
- Github master updated? `git fetch origin` `git rebase origin/master`
- `git push origin master`

Sharing a branch
----------------

Sharing a branch is discouraged as there are many traps you can fall into. If you
need to share a feature then normally the feature is too big and should be split
into smaller sub features / tasks. If this is not possible it is still
recommended that only one developer should be working on the branch even if it
takes longer, whilst the other developer works on something else.

However, if you wish to share a branch:

Before you push or rewrite history (e.g. rebase) do:

1. `git fetch origin`
2. `git rebase origin/feature-x`

This will update your branch with the latest version on github. Please note that
this will minimize the risks however bad stuff can still happen.

Another way of sharing a branch:

Have a branch called `feature-x` which then each developer will prefix their names on:
- john/feature-x
- doe/feature-x

To update the personal branch you would:
- `git fetch origin`
- `git checkout john/feature-x`
- `git rebase origin/feature-x`

Then to merge it into the main feature branch and update origin:
- `git checkout feature-x` - Assuming feature-x is up to date
- `git merge john/feature-x --ff-only`
- `git push origin feature-x`

You would only use fastforward therefore the git history will have no trace of the personal branches.