import React, { useState } from "react";
import { Delete } from "lucide-react";

export default function Calculator() {
  // STATE MANAGEMENT
  // displayValue: What's shown on the calculator screen
  const [displayValue, setDisplayValue] = useState("0");

  // previousValue: Stores the first number in an operation (e.g., "5" in "5 + 3")
  const [previousValue, setPreviousValue] = useState(null);

  // operation: Stores which operation to perform (+, -, ×, ÷)
  const [operation, setOperation] = useState(null);

  // waitingForOperand: Boolean to track if we're waiting for the next number
  // After clicking an operator, this becomes true so the next digit starts a new number
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  // HANDLE NUMBER INPUT
  // This function runs when any number button (0-9) is clicked
  const inputDigit = (digit) => {
    if (waitingForOperand) {
      // If we just clicked an operator, start a fresh number
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      // Otherwise, append the digit to the existing display
      // If display shows "0", replace it; otherwise concatenate
      setDisplayValue(
        displayValue === "0" ? String(digit) : displayValue + digit
      );
    }
  };

  // HANDLE DECIMAL POINT
  // Adds a decimal point to the current number
  const inputDecimal = () => {
    if (waitingForOperand) {
      // If waiting for a new number, start with "0."
      setDisplayValue("0.");
      setWaitingForOperand(false);
    } else if (displayValue.indexOf(".") === -1) {
      // Only add decimal if there isn't one already
      // indexOf returns -1 if '.' is not found in the string
      setDisplayValue(displayValue + ".");
    }
  };

  // CLEAR EVERYTHING
  // Resets calculator to initial state
  const clear = () => {
    setDisplayValue("0");
    setPreviousValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  // TOGGLE POSITIVE/NEGATIVE
  // Multiplies the current number by -1
  const toggleSign = () => {
    const newValue = parseFloat(displayValue) * -1;
    setDisplayValue(String(newValue));
  };

  // PERCENTAGE CONVERSION
  // Divides the current number by 100
  const inputPercent = () => {
    const value = parseFloat(displayValue);
    setDisplayValue(String(value / 100));
  };

  // PERFORM CALCULATION
  // This is where the math happens!
  const performOperation = (nextOperation) => {
    const inputValue = parseFloat(displayValue);

    if (previousValue === null) {
      // First number in a calculation
      // Just store it and wait for the second number
      setPreviousValue(inputValue);
    } else if (operation) {
      // We have a previous number and an operation, so calculate!
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      // Update display with result
      setDisplayValue(String(newValue));
      setPreviousValue(newValue);
    }

    // Set up for the next operation
    setWaitingForOperand(true);
    setOperation(nextOperation);
  };

  // CALCULATE FUNCTION
  // Takes two numbers and an operation, returns the result
  const calculate = (firstValue, secondValue, operation) => {
    switch (operation) {
      case "+":
        return firstValue + secondValue;
      case "-":
        return firstValue - secondValue;
      case "×":
        return firstValue * secondValue;
      case "÷":
        return firstValue / secondValue;
      case "=":
        return secondValue;
      default:
        return secondValue;
    }
  };

  // CALCULATOR BUTTONS ARRAY
  // Organized as a 2D array representing the calculator layout
  const buttons = [
    // Row 1: Clear, +/-, %, ÷
    [
      {
        label: "AC",
        onClick: clear,
        className: "bg-gray-500 hover:bg-gray-600",
      },
      {
        label: "+/-",
        onClick: toggleSign,
        className: "bg-gray-500 hover:bg-gray-600",
      },
      {
        label: "%",
        onClick: inputPercent,
        className: "bg-gray-500 hover:bg-gray-600",
      },
      {
        label: "÷",
        onClick: () => performOperation("÷"),
        className: "bg-orange-500 hover:bg-orange-600",
      },
    ],
    // Row 2: 7, 8, 9, ×
    [
      {
        label: "7",
        onClick: () => inputDigit(7),
        className: "bg-gray-700 hover:bg-gray-800",
      },
      {
        label: "8",
        onClick: () => inputDigit(8),
        className: "bg-gray-700 hover:bg-gray-800",
      },
      {
        label: "9",
        onClick: () => inputDigit(9),
        className: "bg-gray-700 hover:bg-gray-800",
      },
      {
        label: "×",
        onClick: () => performOperation("×"),
        className: "bg-orange-500 hover:bg-orange-600",
      },
    ],
    // Row 3: 4, 5, 6, -
    [
      {
        label: "4",
        onClick: () => inputDigit(4),
        className: "bg-gray-700 hover:bg-gray-800",
      },
      {
        label: "5",
        onClick: () => inputDigit(5),
        className: "bg-gray-700 hover:bg-gray-800",
      },
      {
        label: "6",
        onClick: () => inputDigit(6),
        className: "bg-gray-700 hover:bg-gray-800",
      },
      {
        label: "-",
        onClick: () => performOperation("-"),
        className: "bg-orange-500 hover:bg-orange-600",
      },
    ],
    // Row 4: 1, 2, 3, +
    [
      {
        label: "1",
        onClick: () => inputDigit(1),
        className: "bg-gray-700 hover:bg-gray-800",
      },
      {
        label: "2",
        onClick: () => inputDigit(2),
        className: "bg-gray-700 hover:bg-gray-800",
      },
      {
        label: "3",
        onClick: () => inputDigit(3),
        className: "bg-gray-700 hover:bg-gray-800",
      },
      {
        label: "+",
        onClick: () => performOperation("+"),
        className: "bg-orange-500 hover:bg-orange-600",
      },
    ],
  ];

  return (
    // Main container: full height, gradient background, centered content
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      {/* Calculator container */}
      <div className="bg-black rounded-3xl shadow-2xl p-6 w-full max-w-sm">
        {/* DISPLAY SCREEN */}
        {/* Shows the current number or result */}
        <div className="bg-gray-900 rounded-2xl p-6 mb-4 min-h-[120px] flex items-end justify-end">
          <div className="text-white text-5xl font-light text-right overflow-hidden">
            {/* Format the display value - limit to 12 characters to prevent overflow */}
            {displayValue.length > 12
              ? displayValue.slice(0, 12) + "..."
              : displayValue}
          </div>
        </div>

        {/* BUTTON GRID */}
        {/* Map through each row of buttons */}
        <div className="space-y-3">
          {buttons.map((row, rowIndex) => (
            // Each row is a flex container with equal spacing
            <div key={rowIndex} className="flex gap-3">
              {row.map((button, btnIndex) => (
                // Individual button
                <button
                  key={btnIndex}
                  onClick={button.onClick}
                  // flex-1 makes each button take equal width
                  // h-16 sets fixed height
                  // rounded-xl for rounded corners
                  // transition-all for smooth hover effects
                  className={`flex-1 h-16 rounded-xl text-white text-2xl font-medium transition-all duration-200 transform active:scale-95 ${button.className}`}>
                  {button.label}
                </button>
              ))}
            </div>
          ))}

          {/* BOTTOM ROW: 0, ., = */}
          {/* This row is separate because 0 takes up 2 columns */}
          <div className="flex gap-3">
            {/* Zero button spans 2 columns */}
            <button
              onClick={() => inputDigit(0)}
              className="flex-[2] h-16 rounded-xl bg-gray-700 hover:bg-gray-800 text-white text-2xl font-medium transition-all duration-200 transform active:scale-95">
              0
            </button>
            {/* Decimal button */}
            <button
              onClick={inputDecimal}
              className="flex-1 h-16 rounded-xl bg-gray-700 hover:bg-gray-800 text-white text-2xl font-medium transition-all duration-200 transform active:scale-95">
              .
            </button>
            {/* Equals button */}
            <button
              onClick={() => performOperation("=")}
              className="flex-1 h-16 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-2xl font-medium transition-all duration-200 transform active:scale-95">
              =
            </button>
          </div>
        </div>

        {/* FOOTER TEXT */}
        <div className="text-center text-gray-400 text-sm mt-4">
          React Calculator
        </div>
      </div>
    </div>
  );
}
