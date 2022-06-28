export const convertDuration = (duration: number) => {
  // let sec = Math.round(duration / 1000);
  // let min = Math.floor(sec / 60);
  const hour = Math.floor(duration / 60);
  const min = Math.ceil(duration % 60);
  return { hour, min };
};

export const movieDuration = (duration: number) => {
  const time = convertDuration(duration);
  // if (time.hour <= 0) delete time.hour;
  return Object.entries(time)
    .map(([unit, value]) => {
      if (unit === "hour") return `${value}h`;
      else if (unit === "min") return `${value}min`;
      // else return `${value}sec`;
    })
    .join(" ");
};
