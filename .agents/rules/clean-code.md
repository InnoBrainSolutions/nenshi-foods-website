# Clean Code — Robert C. Martin (Uncle Bob) Principles

Use this document as foundational software craftsmanship guidance across this codebase. Transform "code that merely works" into "code that is clean, readable, and maintainable."

---

## 1. Meaningful Names
* **Use intention-revealing names**: The name of a variable, function, or class should answer why it exists, what it does, and how it is used.
* **Avoid disinformation & noise words**: Do not use vague prefixes or redundant words (`data`, `info`, `itemObject`).
* **Make meaningful distinctions**: Avoid naming variables so similarly that their purpose is ambiguous.
* **Use pronounceable and searchable names**: Avoid cryptic abbreviations (`cnt`, `calcIdx`, `tmp`).

---

## 2. Functions & Components
* **Small**: Functions should do one thing, and do it well (Single Responsibility Principle).
* **Single Level of Abstraction (SLAP)**: Statements within a function should all be at the same level of abstraction. High-level orchestrators should delegate details to focused lower-level helpers.
* **Few arguments**: Ideal functions have zero to two arguments (monadic/dyadic). Avoid functions with 3+ positional arguments — use parameter objects instead.
* **No side effects**: Avoid unexpected mutations or temporal couplings.
* **Command-Query Separation (CQS)**: Functions should either do something (command) or return something (query), but not both.

---

## 3. Comments & Code Hygiene
* **Code is the best documentation**: Prefer expressive, clean code over comments explaining what code does.
* **Explain "Why", not "What"**: Comments should explain non-obvious business intent or domain rationale, not restate syntax.
* **Delete dead and commented-out code**: Never leave commented-out code in the repository. Git history preserves past code.

---

## 4. Error Handling & Guard Clauses
* **Use guard clauses and early returns**: Check preconditions, invalid states, or empty inputs first and return early to eliminate deeply nested `if/else` ladders.
* **Don't return or pass null unnecessarily**: Provide sensible defaults or null-object/empty-array fallbacks.

---

## 5. Formatting & Clean Structure (The Newspaper Metaphor)
* **High-level concepts first**: A source file should read like a newspaper article — high-level concepts and exported entry points at the top, diving into details below.
* **Vertical distance**: Closely related concepts should be kept vertically close to each other.

---

## 6. The Boy Scout Rule
* **"Always leave the campground cleaner than you found it."** Every commit or refactoring should leave the code cleaner, simpler, and more cohesive than before.
