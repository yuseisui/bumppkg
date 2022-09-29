#!/usr/bin/env node

import {program} from 'commander';
import npmVersion from 'libnpmversion';

program
	.name('bumppkg')
	.argument(
		'<newversion>',
		'<newversion> | major | minor | patch | premajor | preminor | prepatch | prerelease | from-git\nThe `newversion` argument should be a valid semver string, a valid second argument to semver.inc (one of `patch`, `minor`, `major`, `prepatch`, `preminor`, `premajor`, `prerelease`), or `from-git`. In the second case, the existing version will be incremented by 1 in the specified field. `from-git` will try to read the latest git tag, and use that as the new npm version.',
	)
	.option(
		'--path <path>',
		'The path to the package being versionified. Defaults to process.cwd().',
	)
	.option(
		'--allow-same-version',
		'Allow setting the version to the current version in package.json.',
	)
	.option(
		'--preid <prerelease-id>',
		'When the `newversion` is pre, premajor, preminor, or prepatch, this defines the prerelease string, like `beta` etc.',
	)
	.option(
		'--tag-version-prefix <prefix>',
		'The prefix to add to the raw semver string for the tag name. Defaults to `v`. (So, by default it tags as `v1.2.3` when versioning to 1.2.3.)',
	)
	.option('--no-commit-hooks', 'Do not run git commit hooks.')
	.option('--no-git-tag-version', 'Do not tag the version.')
	.option('--sign-git-commit', 'GPG sign the git commit.')
	.option('--sign-git-tag', 'GPG sign the git tag.')
	.option('--force', 'Push forward recklessly if any problems happen.')
	.option(
		'--ignore-scripts',
		'Do not run pre/post/version lifecycle scripts.',
	)
	.option(
		'--script-shell <path>',
		'Path to the shell, which should execute the lifecycle scripts. Defaults to `/bin/sh` on unix, or `cmd.exe` on windows.',
	)
	.option(
		'-m, --message <message>',
		'The message for the git commit and annotated git tag that are created. Replace %s with the version.',
		'%s',
	)
	.option(
		'--silent',
		'Passed to @npmcli/run-script to control whether it logs.',
	)
	.action(async (newversion, options) => {
		const version = await npmVersion(newversion, options);
		console.log(version);
	});

program.parseAsync();
