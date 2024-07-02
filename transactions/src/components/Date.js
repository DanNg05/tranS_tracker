import React from "react";

// CALCULATE THE DIFFERENCE IN DAYS
export function getDifferenceInDays  (date1, date2)  {
  const diffTime = Math.abs(date2 - date1);
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

// CHECK TODAY
export function isToday (someDate) {
  const today = new Date();
  return someDate.getDate() === today.getDate() &&
          someDate.getMonth() === today.getMonth() &&
          someDate.getFullYear() === today.getFullYear();
};

// SORT DATA BY DATE
export function sortCardsByDate  (cards)  {
  return cards.sort((a, b) => new Date(b.date) - new Date(a.date));
};

// // GROUP BY DATE
export function groupCardsByDate  (cards)  {
  return cards.reduce((grouped, card) => {
    const date = card.date;
    if (!grouped[date]) {
      grouped[date] = [];
    }
    grouped[date].push(card);
    return grouped;
  }, {});
};

// PUT DIFFERENCE BACKGROUND COLOR OF DIV
export function handleBackground  (index)  {
  if (index % 2 === 0) {
    return `grey-bg`
  }
    return `darker-bg`
}
