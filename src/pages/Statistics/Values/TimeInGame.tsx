import prettyMilliseconds from "pretty-ms";
import { StatsDataStore } from "../../../GameProvider/Stores/StatsDataStore";

export const StatsTimeInGame = () => {
  const timeInGame = StatsDataStore((state) => state.timeInGame);

  return prettyMilliseconds(timeInGame * 1000, {
    secondsDecimalDigits: 0,
  });
};
