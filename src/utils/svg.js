import React from "react";

export function chevronLeft(click) {
  return (
    <svg
      style={{ width: "30px", height: "30px" }}
      viewBox="0 0 24 24"
      onClick={() => {
        click();
      }}
    >
      <path
        fill="grey"
        d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"
      />
    </svg>
  );
}

export function chevronRight(click) {
  return (
    <svg
      style={{ width: "30px", height: "30px" }}
      viewBox="0 0 24 24"
      onClick={() => {
        click();
      }}
    >
      <path
        fill="grey"
        d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"
      />
    </svg>
  );
}

export function close(click, color) {
  return (
    <svg
      style={{ width: "30px", height: "30px", margin: "-5px -5px 0 0" }}
      viewBox="0 0 24 24"
      onClick={() => {
        click();
      }}
    >
      <path
        fill="#d2d6d9"
        d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z"
      />
    </svg>
  );
}
