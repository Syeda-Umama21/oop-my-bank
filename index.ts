#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";


// Display a Colourfull Welcome message
console.log(chalk.bold.rgb(184, 184,184)(` \n  \t\t <<<==========================>>>`));
console.log(chalk.bold.rgb(184, 184,184)(`<<<=======>>> ${chalk.bold.hex(`#0bd9d2`)(`Welcome to OOP-MyBank-System!`)}  <<<=========>>>`));
console.log(chalk.bold.rgb(184, 184,184)(`\t\t <<<==============================>>>\n`));

// Bank Account interface
interface BankAccount {
    accountNumber: number;
    balance: number;
    withdraw(amount: number): void;
    deposit(amount: number): void;
    checkBalance(): void;
}

// Bank Account class
class BankAccount implements BankAccount {
    accountNumber: number;
    balance: number;

    constructor(accountNumber: number, balance: number) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }

    // Debit money
    withdraw(amount: number): void {
        if (this.balance >= amount) {
            this.balance -= amount;
            console.log(chalk.cyan(`Withdrawal of $${amount} successful. Remaining balance: $${this.balance}`))
        } else {
            console.log("Insufficient balance.");
        }
    }

    // Credit money
deposit(amount: number): void {
    let fee = 0;
    if (amount > 100) {
        fee = 1; // $1 fee charged if more than $100 is deposited
    }

    const finalAmount = amount - fee; // Amount to be added to balance after fee
    this.balance += finalAmount;
    console.log(chalk.rgb(134, 243, 230)(`Deposit of $${amount} received. Remaining balance: $${this.balance}`));
}

    // Check balance
    checkBalance(): void {
        console.log(chalk.rgb(63, 249, 220)(`Current balance: $${this.balance}`));
    }
}

// Customer class
class Customer {
    firstName: string;
    lastName: string;
    gender: string;
    age: number;
    mobileNumber: number;
    account: BankAccount;

    constructor(firstName: string, lastName: string, gender: string, age: number, mobileNumber: number, account: BankAccount) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.gender = gender;
        this.age = age;
        this.mobileNumber = mobileNumber;
        this.account = account;
    }
}

// Create bank accounts
const accounts: BankAccount[] = [
    new BankAccount(1004, 500),
    new BankAccount(1007, 1000),
    new BankAccount(1009, 2000)
];

// Create customers
const customers: Customer[] = [
    new Customer("Bisma", "Shah", "Female", 17, 3162223334, accounts[0]),
    new Customer("Umama", "Shah", "Female", 18, 3332223334, accounts[1]),
    new Customer("Attia", "Shah", "Female", 19, 3412223334, accounts[2])
];

// Function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message:  chalk.yellow("Enter your account number:")
        });

        const accountNumber = Number(accountNumberInput.accountNumber); // Input ko number me convert karna

        const customer = customers.find(customer => customer.account.accountNumber === accountNumber);
        if (customer) {
            console.log(chalk.rgb(255, 178, 102).bold(`Welcome, ${customer.firstName} ${customer.lastName}!\n`));
            const ans = await inquirer.prompt([{
                name: "select",
                type: "list",
                message: chalk.green.bold("Select an operation"),
                choices: ["Deposit", "Withdraw", "Check Balance", "Exit"]
            }]);

            switch (ans.select) {
                case "Deposit":
                    const depositAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.rgb(238, 244, 169).bold("Enter the amount to deposit:")
                    });
                    customer.account.deposit(depositAmount.amount);
                    break;
                case "Withdraw":
                    const withdrawAmount = await inquirer.prompt({
                        name: "amount",
                        type: "number",
                        message: chalk.rgb(63, 249, 220).bold("Enter the amount to withdraw:")
                    });
                    customer.account.withdraw(withdrawAmount.amount);
                    break;
                case "Check Balance":
                    customer.account.checkBalance();
                    break;
                case "Exit":
                    console.log(chalk.red.bold("Exiting bank program..."));
                    console.log(chalk.rgb(63, 249, 220).bold("\nThank you for using our bank services. Have a great day!"));
                    return;
            }

        } else {
            console.log(chalk.bold.rgb(151, 238, 143).bold("Invalid account number. Please try again."));
        }
    } while (true);
}

service();