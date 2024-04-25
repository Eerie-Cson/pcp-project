//  https://github.com/ngryman/cz-emoji

/**
 * To use commitizen
 *
 * git checkout -b "<branch name>"
 * git add <files-to-add>
 * npx cz (promts below will be display, select appropriate option)
 * git push --set-upstream origin <branch name>
 */

const inquirer = require('inquirer');

const prompter = (_, commit) => {
  inquirer
    .prompt([
      {
        type: 'list',
        name: 'type',
        message: "Select the type of change you're committing:",
        choices: [
          {
            name: 'feat: 🚀 new feature',
            value: '🚀 feat',
          },
          {
            name: 'fix: 🐞 bug fix',
            value: '🐞 fix',
          },
          {
            name: 'chore: 🌟 chore changes',
            value: '🌟 chore',
          },
          {
            name: 'docs: 📄 documentation changes',
            value: '📄 docs',
          },
          {
            name: 'ref: 🔥 code refactoring',
            value: '🔥 ref',
          },
          {
            name: 'test: 🔍 test changes',
            value: '🔍 test',
          },
          {
            name: 'devops: 🔗 DevOps changes',
            value: '🔗 devops',
          },
          {
            name: 'infra: 🖥️ infrastructure changes',
            value: '🖥️ infra',
          },
        ],
      },
      {
        type: 'list',
        name: 'scope',
        message: 'Select the scope:',
        choices: ['component', 'user', 'others'].map((item) => ({
          name: item,
          value: item,
        })),
      },
      {
        type: 'input',
        name: 'message',
        message: 'Message:\n',
        validate(input) {
          if (!input) {
            throw Error('empty commit message');
          }

          return true;
        },
      },
    ])
    .then((answers) =>
      commit(
        `${answers.type} (${answers.scope}): ${answers.message}\n\n${answers.references}`
      )
    );
};

module.exports = { prompter };
