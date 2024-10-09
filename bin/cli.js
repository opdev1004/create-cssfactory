#!/usr/bin/env node

const { execSync } = require('child_process');
const { input } = require('@inquirer/prompts');
const fs = require('fs');

async function runCommand(command)
{
    try
    {
        execSync(`${ command }`, { stdio: 'inherit' });
    }
    catch (error)
    {
        console.error(`Error: ${ command }\n`, error);
        return false;
    }

    return true;
}

async function main()
{
    try
    {
        console.log(`

 ██████╗███████╗███████╗                                   
██╔════╝██╔════╝██╔════╝                                   
██║     ███████╗███████╗                                   
██║     ╚════██║╚════██║                                   
╚██████╗███████║███████║                                   
 ╚═════╝╚══════╝╚══════╝                                   
                                                           
███████╗ █████╗  ██████╗████████╗ ██████╗ ██████╗ ██╗   ██╗
██╔════╝██╔══██╗██╔════╝╚══██╔══╝██╔═══██╗██╔══██╗╚██╗ ██╔╝
█████╗  ███████║██║        ██║   ██║   ██║██████╔╝ ╚████╔╝ 
██╔══╝  ██╔══██║██║        ██║   ██║   ██║██╔══██╗  ╚██╔╝  
██║     ██║  ██║╚██████╗   ██║   ╚██████╔╝██║  ██║   ██║   
╚═╝     ╚═╝  ╚═╝ ╚═════╝   ╚═╝    ╚═════╝ ╚═╝  ╚═╝   ╚═╝      

    CSS Factory!
    
    Simple CSS library build tool!

        `);

        const projectName = await input({ message: 'Please enter name of project (directory):' });
        const gitCloneCommand = `git clone --depth 1 https://github.com/opdev1004/create-cssfactory-template.git ${ projectName }`
        const setupCommand = `cd ${ projectName } && git remote remove origin && npm install`
        console.log(`Cloning the repository with name: ${ projectName }`);

        let result = await runCommand(gitCloneCommand);

        if (!result) process.exit(1);

        console.log(`Cloning is successful`);
        console.log(`Setting up ${ projectName }`);

        const packageJsonPath = `./${ projectName }/package.json`;
        const packageJsonContent = fs.readFileSync(packageJsonPath, 'utf8');
        const packageJson = JSON.parse(packageJsonContent);
        packageJson.name = projectName;

        fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 4));

        result = await runCommand(setupCommand);

        if (!result) process.exit(1);

        console.log(`Setting up is successful`);
        console.log(`
        

Github: https://github.com/opdev1004/cssfactory
Become a sponsor & support CSS Factory.
https://ko-fi.com/opdev1004
https://github.com/sponsors/opdev1004

Build: npm run build

        `);
    }
    catch (error)
    {
        console.error(`Error: `, error);
    }
}

main();