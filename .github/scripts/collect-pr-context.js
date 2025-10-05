module.exports = async function collectPrContext({ github, context, core }) {
  const { data: files } = await github.rest.pulls.listFiles({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
    per_page: 100,
  });

  const indent = (value) => {
    if (!value) return '';
    const prefix = '      ';
    return value
      .split('\n')
      .map((line) => prefix + line)
      .join('\n');
  };

  const diff = indent(
    files.map((file) => `# ${file.filename}\n${file.patch ?? ''}`).join('\n\n'),
  ).slice(0, 30000);

  const { data: pr } = await github.rest.pulls.get({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
  });

  const { data: commits } = await github.rest.pulls.listCommits({
    owner: context.repo.owner,
    repo: context.repo.repo,
    pull_number: context.issue.number,
    per_page: 250,
  });

  const commitSummaries = commits
    .slice(0, 20)
    .map(
      (commit) =>
        `- ${commit.sha.slice(0, 7)} ${commit.commit.message.split('\n')[0]}`,
    )
    .join('\n');

  const body = (pr.body ?? '').trim() || '(empty)';

  const contextDetails = [
    `Title: ${pr.title}`,
    `Author: ${pr.user?.login ?? 'unknown'}`,
    `Head: ${pr.head.label} (${pr.head.sha.slice(0, 7)})`,
    `Base: ${pr.base.label} (${pr.base.sha.slice(0, 7)})`,
    `Draft: ${pr.draft ? 'yes' : 'no'}`,
    `URL: ${pr.html_url}`,
    `Body:\n${body}`,
    `Commits:\n${commitSummaries || '(none listed)'}`,
  ].join('\n\n');

  core.setOutput('diff', diff);
  core.setOutput('context', indent(contextDetails));
};
