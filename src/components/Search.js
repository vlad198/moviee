import React from "react";

export default function Search() {
  return (
    <div fluid class="ui fluid category search">
      <div fluid class="ui icon input">
        <input fluid class="prompt" type="text" placeholder="Search animals..." />
        <i class="search icon" />
      </div>
      <div class="results" />
    </div>
  );
}
