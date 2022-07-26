# Log-parser-log

Log-parser-log
# Description
 Develop the command line node.js application, which parses the input log file. 

The application should find all the log messages with the level error and print them into the output file. Formats of input and output files are described below.

# Getting Started

To obtain a copy of this app download or clone the repository at this [url](https://github.com/AbonyiXavier/Log-parser-app)

# Prerequisites

You must have

- NodeJs Installed
- A browser Installed
- An Internet connection to download the dependencies.

## Installing locally / Usage

- (If the repository wasn't cloned)Extract the contents of the downloaded zip file into any suitable location on the computer
- In the command prompt, cd to the root of the directory you extracted the app into
- Run `npm install` to install all dependencies
- Run `npm run build`
- Run `parser -i "/mixed.log" -o "errors.json"` 
        or
- Run `parser --input "/mixed.log" --output "errors.json"` 
- Run test `npm run test:watch`   

## Built With

- NodeJs
- Typescript
- commander
- jest for unit testing

## Author

- AbonyiXavier
