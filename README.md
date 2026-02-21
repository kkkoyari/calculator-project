# Calculator (The Odin Project)

A simple, fully functional calculator built as part of **The Odin Project (Foundations)**.  
The focus of this project is not only UI, but mainly **state management**, input handling, and predictable behavior across edge cases.

## Features

- Basic operations: **+ − × ÷**
- Chained calculations (example: `12 + 7 - 1 =`)
- Prevents accidental evaluation when operators are pressed consecutively  
  (pressing a second operator replaces the previous one instead of evaluating)
- Decimal input with a single `.` per number
- Backspace/delete for the current input
- Clear reset
- Division by zero handled with an error message (styled in UI)
- Long numbers supported without breaking layout (scrollable display)
- Keyboard support:
  - Digits `0–9`
  - Operators `+ - * /`
  - `.` for decimals
  - `Enter` / `=` for equals
  - `Backspace` for delete
  - `Escape` for clear

## What I learned

### 1) Separating UI from state
At first it’s tempting to treat the display (`textContent`) as the “source of truth”.  
This project made it clear that you need separate state variables and use the UI only as an output.

### 2) Why `eval()` is a bad idea
I intentionally avoided `eval()` and built the calculator logic explicitly.  
This forces proper handling of:
- validation and edge cases
- safe behavior
- predictable rules for state transitions

### 3) State machine thinking
The hardest part was not math, but defining how the calculator behaves depending on the current state:
- entering first number vs second number
- starting a new number after selecting an operator
- starting a new calculation after showing a result
- avoiding evaluation on repeated operator presses

Using simple state flags and debugging them in DevTools helped a lot.

### 4) Debugging with DevTools
When logic became complex, I stopped guessing and used:
- breakpoints in `Sources`
- step-by-step execution
- inspecting variable state changes

That was the turning point where bugs became solvable quickly.

### 5) UI stability (overflow + error state)
To keep the UI stable:
- long numbers are scrollable instead of overflowing the display
- error state is styled via a CSS class instead of mixing logic into the UI

## Notes

- The display is intentionally scrollable so long inputs/results don’t break layout.
- Error messages (division by zero) are styled via a dedicated state/class.
