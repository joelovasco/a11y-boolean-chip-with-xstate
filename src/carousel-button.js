import React from "react";
import { createMachine } from "xstate";
import { useMachine } from "@xstate/react";
import "./search-field.scss";
import "./chip.scss";

const BOOLEAN = { AND: "AND", OR: "OR", NOT: "NOT" };

const buttonMachine = createMachine({
  initial: BOOLEAN.AND,
  states: {
    [BOOLEAN.AND]: {
      on: {
        next: BOOLEAN.OR
      }
    },
    [BOOLEAN.OR]: {
      on: {
        next: BOOLEAN.NOT
      }
    },
    [BOOLEAN.NOT]: {
      on: {
        next: BOOLEAN.AND
      }
    }
  }
});

const CarouselButton = () => {
  const [service, send] = useMachine(buttonMachine);
  const currentBooleanValue = service.value;

  const handleOnBooleanClick = e => {
    e.preventDefault();
    send("next");
  };

  const renderButtonText = currentBoolean => {
    const text = (bool, order) => (
      <span className="eb-operator">
        {bool}
        <span className="visually-hidden">{`, ${order}`}</span>
      </span>
    );

    switch (currentBoolean) {
      case BOOLEAN.AND:
        return text(currentBoolean, "1 of 3");
      case BOOLEAN.OR:
        return text(currentBoolean, "2 of 3");
      case BOOLEAN.NOT:
        return text(currentBoolean, "3 of 3");
    }
  };

  return (
    <form action="">
      <fieldset>
        <legend>Advanced Searches</legend>

        {/* Row 1 wrapper */}
        <fieldset>
          <legend>Advanced Search - row1</legend>
          <div className="search-field">
            <input
              className="search-field__input"
              type="text"
              aria-label="search input field"
              autoFocus
            />
          </div>
        </fieldset>

        {/* Row 2 wrapper */}
        <fieldset>
          <legend>Advanced Search - row2</legend>
          <div className="search-field">
            <button
              className="chip chip--boolean"
              aria-roledescription="boolean operator toggle button"
              onClick={handleOnBooleanClick}
              aria-live="polite"
            >
              {renderButtonText(currentBooleanValue)}
            </button>

            <input
              className="search-field__input"
              type="text"
              aria-label="search input field"
            />
          </div>
        </fieldset>
      </fieldset>
    </form>
  );
};

export default CarouselButton;
