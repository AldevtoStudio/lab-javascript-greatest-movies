// Iteration 1: All directors? - Get the array of all directors.
// _Bonus_: It seems some of the directors had directed multiple movies so they will pop up multiple times in the array of directors.
// How could you "clean" a bit this array and make it unified (without duplicates)?
function getAllDirectors(arr) {
  return [
    ...new Set(
      arr.map((x) => {
        return x.director;
      })
    )
  ];
}

// Iteration 2: Steven Spielberg. The best? - How many drama movies did STEVEN SPIELBERG direct?
function howManyMovies(arr) {
  return arr.filter((movie) => {
    return (
      movie.genre.includes('Drama') &&
      movie.director.includes('Steven Spielberg')
    );
  }).length;
}

// Iteration 3: All scores average - Get the average of all scores with 2 decimals
function scoresAverage(arr) {
  if (!arr.length) return 0;

  // Splitted the average into a separate var for easy reading
  let average = arr.reduce((acummulator, movie) => {
    return acummulator + (movie.score ? movie.score / arr.length : 0);
  }, 0);

  return +(Math.round(average + 'e+2') + 'e-2');
}

// Iteration 4: Drama movies - Get the average of Drama Movies
function dramaMoviesScore(arr) {
  if (!arr.length) return 0;

  let dramaMovies = arr.filter((movie) => {
    return movie.genre.includes('Drama');
  });

  // Splitted the average into a separate var for easy reading
  let average = dramaMovies.reduce((acummulator, movie) => {
    return acummulator + (movie.score ? movie.score / dramaMovies.length : 0);
  }, 0);

  return +(Math.round(average + 'e+2') + 'e-2');
}

// Iteration 5: Ordering by year - Order by year, ascending (in growing order)
function orderByYear(arr) {
  return [
    ...arr.sort((a, b) => {
      if (a.year - b.year !== 0) return a.year - b.year;
      else return a.title > b.title ? 1 : -1;
    })
  ];
}

// Iteration 6: Alphabetic Order - Order by title and print the first 20 titles
function orderAlphabetically(arr) {
  let namesArr = [
    ...arr.map((x) => {
      return x.title;
    })
  ].sort();

  if (namesArr.length > 20) {
    namesArr.length = 20;
    return namesArr;
  } else return namesArr.slice(0, 20);
}

// BONUS - Iteration 7: Time Format - Turn duration of the movies from hours to minutes
function turnHoursToMinutes(arr) {
  return [
    ...arr.map((movie) => {
      let durationStr = movie.duration.replace(/[a-z]/g, '').split(' ');

      let hoursToMins = parseInt(durationStr[0] * 60);
      let mins = durationStr.length > 1 ? parseInt(durationStr[1]) : 0;

      let newDuration = hoursToMins + mins;

      return {
        ...[arr],
        duration: newDuration
      };
    })
  ];
}

// BONUS - Iteration 8: Best yearly score average - Best yearly score average
function bestYearAvg(arr) {
  if (!arr.length) return null;

  const yearMoviesPair = {};

  // Assing a year-movie pair value (as its an hash, years wont be duplicated).
  arr.forEach((movie) => {
    // If the year doesnt exist in the hash, create a value pair. If it exist, add another movie value.
    if (!yearMoviesPair[movie.year]) yearMoviesPair[movie.year] = [movie];
    else yearMoviesPair[movie.year].push(movie);
  });

  let year = '';
  let score = 0;

  // In each year, calc the average of the value arr.
  for (const key in yearMoviesPair) {
    const value = yearMoviesPair[key];
    if (scoresAverage(value) > score) {
      score = scoresAverage(value);
      year = key;
    }
  }

  return `The best year was ${year} with an average score of ${score}`;
}

// The following is required to make unit tests work.
/* Environment setup. Do not modify the below code. */
if (typeof module !== 'undefined') {
  module.exports = {
    getAllDirectors,
    howManyMovies,
    scoresAverage,
    dramaMoviesScore,
    orderByYear,
    orderAlphabetically,
    turnHoursToMinutes,
    bestYearAvg
  };
}
