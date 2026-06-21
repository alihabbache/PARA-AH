# Contributing to PARA App

First off, thank you for considering contributing to PARA App! It's people like you that make PARA App such a great tool.

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed after following the steps**
* **Explain which behavior you expected to see instead and why**
* **Include screenshots if possible**

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion, please include:

* **Use a clear and descriptive title**
* **Provide a step-by-step description of the suggested enhancement**
* **Provide specific examples to demonstrate the steps**
* **Describe the current behavior and explain which behavior you expected to see instead**
* **Explain why this enhancement would be useful**

### Pull Requests

* Fill in the required template
* Do not include issue numbers in the PR title
* Follow the TypeScript and React style guides
* Include thoughtfully-worded, well-structured tests
* Document new code
* End all files with a newline

## Development Process

1. **Fork the repo** and create your branch from `main`
2. **Install dependencies**: `npm install`
3. **Start the dev server**: `npm run dev`
4. **Make your changes**
5. **Test your changes** thoroughly
6. **Commit your changes** using clear commit messages
7. **Push to your fork** and submit a pull request

### Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

Examples:
```
Add quick capture modal component
Fix search functionality in MainContent
Update README with new features
```

## Style Guides

### TypeScript Style Guide

* Use TypeScript for all new code
* Define proper types and interfaces
* Avoid using `any` type
* Use meaningful variable and function names
* Add JSDoc comments for complex functions

### React Style Guide

* Use functional components with hooks
* Keep components small and focused
* Use proper prop types
* Follow the single responsibility principle
* Use meaningful component names

### CSS/Tailwind Style Guide

* Use Tailwind utility classes
* Keep custom CSS minimal
* Follow mobile-first approach
* Maintain consistent spacing

## Project Structure

```
src/
├── components/     # React components
├── store/         # State management
├── types/         # TypeScript types
├── utils/         # Helper functions
├── hooks/         # Custom hooks
└── App.tsx        # Main component
```

## Testing

* Write tests for new features
* Ensure all tests pass before submitting PR
* Aim for high test coverage

## Questions?

Feel free to open an issue with your question or reach out to the maintainers.

Thank you for contributing! 🎉