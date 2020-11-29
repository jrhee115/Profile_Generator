const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamMember = []
const idArray = []

function appMenu(){

    function createManager(){
        console.log("PLease build your team");
        inquirer.prompt([
            {
                type: "input",
                name: "managerName",
                message: "What is your name?"
            },
            {
                type: "input",
                name: "managerID",
                message: "What is your ID number?"
            },
            {
                type: "input",
                name: "managerEmail",
                message: "What is your email?"
            },
            {
                type: "input",
                name: "managerOfficeNumber",
                message: "What is your office number?"
            },
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerID, answers.managerEmail, answers.managerOfficeNumber);
            teamMember.push(manager);
            idArray.push(answers.managerID);
            createTeam();
        })
    }
    function createTeam(){
        inquirer.prompt([
            {
                type: "list",
                name: "memberChoice",
                message: "Which type of team member would you like to add?",
                choices: [
                    "Engineer",
                    "Intern",
                    "I don't want to add any more team members"
                ]
            }
        ]).then(userChoice => {
            switch (userChoice.memberChoice) {
                case "Engineer":
                    addEngineer();
                    break;
                case "Intern":
                    addIntern();
                    break;
                default:
                    buildTeam();
            }
        });
    }
    function addEngineer(){
        inquirer.prompt([
            {
                type: "input",
                name: "engineerName",
                message: "What is your name?"
            },
            {
                type: "input",
                name: "engineerID",
                message: "What is your ID number?"
            },
            {
                type: "input",
                name: "engineerEmail",
                message: "What is your email?"
            },
            {
                type: "input",
                name: "engineerGithub",
                message: "What is your Github username?"
            },
        ]).then(answers => {
            const engineer = new Engineer(answers.engineerName, answers.engineerID, answers.engineerEmail, answers.engineerGithub);
            teamMember.push(engineer);
            idArray.push(answers.engineerID);
            createTeam();
        })
    }
    function addIntern(){
        inquirer.prompt([
            {
                type: "input",
                name: "internName",
                message: "What is your name?"
            },
            {
                type: "input",
                name: "internID",
                message: "What is your ID number?"
            },
            {
                type: "input",
                name: "internEmail",
                message: "What is your email?"
            },
            {
                type: "input",
                name: "internSchool",
                message: "What school did you attend? "
            },
        ]).then(answers => {
            const intern = new Intern(answers.internName, answers.internID, answers.internEmail, answers.internSchool);
            teamMember.push(intern);
            idArray.push(answers.internID);
            createTeam();
        })
    }
    function buildTeam(){
        if (!fs.existsSync(OUTPUT_DIR)) {
            fs.mkdirSync(OUTPUT_DIR)
        }
        fs.writeFileSync(outputPath, render(teamMember), "utf-8");
    }

    createManager();
}

appMenu();